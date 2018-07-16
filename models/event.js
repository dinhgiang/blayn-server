const mongoose = require('mongoose');

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
    default: null
  },
  followingStudents: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'students'
    },
    visitedTime: {
      type: Date,
      default: null
    }
  }]
});

EventSchema.statics.getAllForRoot = () => {
  return Event.find().where('status').ne('draft').select('-__v');
};

EventSchema.statics.getAllForStudent = () => {
  return Event.find({status: 'approved'}).select('-__v -status');
};

EventSchema.statics.getAllForSponsor = () => {
  return Event.find({status: 'approved'}).select('title date startingTime');
};

EventSchema.statics.createEvent = (event) => {
  const newEvent = new Event(event);
  return newEvent.save();
};

EventSchema.statics.addFollowingStudent = (studentId, eventId) => {
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
    status: event.status
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

const Event = mongoose.model('events', EventSchema);

module.exports = {
  Event
};