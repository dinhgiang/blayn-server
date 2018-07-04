const mongoose = require('mongoose');
const { Student } = require('../models/student.js');

const EventStudentSchema = mongoose.Schema({
  studentId: {
    type: String,
    require: true
  },
  eventId: {
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

EventStudentSchema.statics.getHistory = async (userId) => {
  const student = await Student.findOne({userId: userId});
  return EventStudent.find({studentId : student._id});
}

const EventStudent = mongoose.model('eventstudents', EventStudentSchema);

module.exports = {
  EventStudent
};