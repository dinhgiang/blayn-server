const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
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
});

StudentSchema.statics.getAll = () => {
  return Student.find();
};

StudentSchema.statics.getProfile = async (userId) => {
  const student = await Student.findOne({ userId: userId })
    .populate({path: 'userId', select: 'email'});
  
  const result = {
    ...student._doc
  }

  result.email = result.userId.email;
  result.userId = result.userId._id;

  return result;  
};

const Student = mongoose.model('students', StudentSchema);

module.exports = {
  Student
};