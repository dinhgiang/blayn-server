const mongoose = require('mongoose');

const EventStudentSchema = mongoose.Schema({
  studentID: {
    type: String,
    require: true
  },
  eventID: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true,
    default: "unfollow"
  },
  visitedTime: {
    type: Date,
    require: true
  }
});

const EventStudent = mongoose.model('event_student', EventStudentSchema);

module.exports = {
  EventStudent
};