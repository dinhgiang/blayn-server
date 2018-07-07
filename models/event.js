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
    type: Date,
    required: true
  },
  endingTime: {
    type: Date,
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
    required: true
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
})

EventSchema.statics.getAll = () => {
  return Event.find().select('-__v');
};

const Event = mongoose.model('events', EventSchema);

module.exports = {
  Event
};