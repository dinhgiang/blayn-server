const mongoose = require('mongoose');

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

EventSchema.statics.createEvent = async (event) => {
  const newEvent = new Event(event);
  return await newEvent.save();
};

EventSchema.statics.addFollowingStudent = async (studentId, eventId) => {
  return await Event.update({
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
  })
  .then(result => { return "apply success"; })
  .catch(err => { return {message: err.message}; });
};

EventSchema.statics.removeFollowingStudent = async (studentId, eventId) => {
  return await Event.update({
    _id: eventId
  }, {
    $pull: {
      followingStudents: {
        studentId: studentId
      }
    }
  })
  .then(result => { return "cancel success"; });
};

EventSchema.statics.editEvent = async (event) => {
  return await Event.update({
    sponsorId: event.sponsorId,
    _id: event._id
  }, {
    title: event.title,
    date: event.date,
    startingTime: event.startingTime,
    description: event.description,
    image: event.image,
    status: event.status
  })
  .then(result => { return "update success"; });
};

const Event = mongoose.model('events', EventSchema);

module.exports = {
  Event
};