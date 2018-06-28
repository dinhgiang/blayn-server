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
    require: false
  },
  image: {
    type: String,
    require: true
  },
  sponsorID: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  unavailableSeats: {
    type: Number,
    require: true
  }
})

const Event = mongoose.model('Event', EventSchema);

module.exports = {
  Event
};