const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
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
  image: {
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
    type: Number,
    require: true
  }
})

const Student = mongoose.model('Student', StudentSchema);

module.exports = {
  Student
};