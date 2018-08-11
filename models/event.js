const mongoose = require('mongoose');
const moment = require('moment');

const { Sponsor } = require('./sponsor.js');

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  startingTime: {
    type: String,
    required: true
  },
  endingTime: {
    type: String,
    required: true
  },
  joinedStudents: {
    type: Number,
    required: false,
    default: 0
  },
  description: {
    type: String,
    required: false,
    default: null
  },
  image: {
    type: String,
    required: true
  },
  sponsorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'sponsors'
  },
  status: {
    type: String,
    required: true
  },
  unavailableSeats: {
    type: Number,
    required: false,
    default: 0
  },
  followingStudents: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'students'
    },
    visitedTime: {
      type: String,
      default: null
    }
  }],
  maxStudents: {
    type: Number,
    required: true
  }
});

EventSchema.statics.getAllForRoot = () => {
  return Event.find().where('status').ne('draft').select('-__v');
};

EventSchema.statics.getAllForStudent = () => {
  return Event.find({status: 'approved'}).select('-__v');
};

EventSchema.statics.getAllForSponsor = () => {
  return Event.find({status: 'approved'}).select('title date startingTime');
};

EventSchema.statics.createEvent = (event) => {
  const newEvent = new Event(event);
  return newEvent.save();
};

EventSchema.statics.addFollowingStudent = async (studentId, eventId) => {
  const event = await Event.findById(eventId);
  if (event.joinedStudents >= event.maxStudents) {
    throw new Error("event full");
  }

  return Event.update({
    _id: eventId,
    'followingStudents.studentId' : {
      $ne: studentId
    }
  }, {
    $push: {
      followingStudents: {
        studentId: studentId
      }
    },
    $set: {
      joinedStudents: event.joinedStudents + 1
    }
  });
};

EventSchema.statics.removeFollowingStudent = (studentId, eventId) => {
  return Event.update({
    _id: eventId
  }, {
    $pull: {
      followingStudents: {
        studentId: studentId
      }
    }
  });
};

EventSchema.statics.editEvent = (event) => {
  return Event.update({
    sponsorId: event.sponsorId,
    _id: event._id
  }, {
    title: event.title,
    date: event.date,
    startingTime: event.startingTime,
    description: event.description,
    image: event.image,
    status: event.status,
    maxStudents: event.maxStudents
  });
};

EventSchema.statics.approve = event => {
  return Event.update({
    _id: event.eventId,
    status: "under review"
  }, {
    status: event.status
  });
};

EventSchema.statics.removeEventForRoot = eventId => {
  return Event.deleteOne({_id: eventId});
};

EventSchema.statics.removeEventForSponsor = async (eventId, userId) => {
  const sponsor = await Sponsor.findOne({userId: userId});
  return await Event.deleteOne({_id: eventId, sponsorId: sponsor._id});
};

// Update event when student scan barcode
EventSchema.statics.updateEvent = (studentId) => {
  return Event.update({
    followingStudents: {
      $elemMatch: {
        studentId: studentId,
        visitedTime: null
      }
    },
    status: "holding"
  }, {
    $inc: {
      unavailableSeats: 1
    },
    $set: {
      "followingStudents.$.visitedTime": moment().format("MM/DD/YYYY HH:mm:ss")
    }
  })
};

EventSchema.statics.getAllUnavailableSeats = () => {
  return Event.aggregate([{
    $match: {
      status: "holding"
    }
  }, {
    $group: { _id: null,
      unavailableSeats: {
        $sum: "$unavailableSeats"
      }
    }
  }])
};

const Event = mongoose.model('events', EventSchema);

async function updateStatus () {
  await Event.updateMany({
    status: "approved",
    date: {
      $eq: moment().format("MM/DD/YYYY")
    },
    startingTime: {
      $lte: moment().format("HH:mm:ss")
    },
    endingTime: {
      $gte: moment().format("HH:mm:ss")
    }
  }, {
    status: "holding"
  });
  
  await Event.updateMany({
    status: "approved",
    $or: [{
      date: {
        $eq: moment().format("MM/DD/YYYY")
      },
      endingTime: {
        $lt: moment().format("HH:mm:ss")
      }
    }, {
      date: {
        $lt: moment().format("MM/DD/YYYY")
      }
    }]
  }, {
    status: "finished"
  });
};

setTimeout(updateStatus, 1000);
setInterval(updateStatus, 1000 * 60);

module.exports = {
  Event
};