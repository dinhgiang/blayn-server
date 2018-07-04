const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    require: true
  },
  startingTime: {
    type: Date,
    require: true
  },
  endingTime: {
    type: Date,
    require: true
  },
  joinedStudents: {
    type: Number,
    require: true,
    default: 0
  },
  description: {
    type: String,
    require: false,
    default: null
  },
  image: {
    type: String,
    require: true
  },
  sponsorId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'sponsors'
  },
  status: {
    type: String,
    require: true
  },
  unavailableSeats: {
    type: Number,
    require: true
  },
  followingStudents: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'students'
    },
    visitedTime: {
      type: Date,
      default: null
    }
  }]
})

EventSchema.statics.getAll = () => {
  return Event.find();
};

EventSchema.statics.getEventsForSponsor = (sponsorId) => {
  return Event.find({sponsorId: sponsorId});
};

const Event = mongoose.model('events', EventSchema);

module.exports = {
  Event
};