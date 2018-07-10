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
}

const Event = mongoose.model('events', EventSchema);

module.exports = {
  Event
};