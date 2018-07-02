const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true,
    trim: true
  },
  givenName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    require: false
  },
  admissionYear: {
    type: Number,
    require: true
  },
  department: {
    type: String,
    require: true
  },
  dateOfBirth: {
    type: Date,
    require: true,
    default: 0
  },
  studentCard: {
    type: String,
    require: false
  },
  studentNumber: {
    type: Number,
    require: true
  },
  barcode: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  memberDeadline: {
    type: Date,
    require: true
  }
})

const Student = mongoose.model('students', StudentSchema);

module.exports = {
  Student
};