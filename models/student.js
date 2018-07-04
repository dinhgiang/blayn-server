const mongoose = require('mongoose');

const { Event } = require('./event.js');

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

StudentSchema.statics.getHistory = async (userId) => {
  const student = await Student.findOne({userId: userId});
  
  const followingEvents = await Event
    .find()
    .where('followingStudents')
    .elemMatch({ 
      studentId: student._id, 
      visitedTime: { $ne: null } 
    });

  const history = followingEvents.map(event => {
    return event.followingStudents.filter(el => el.studentId.toString() === student._id.toString())[0];
  })
    .sort((a, b) => new Date(b.visitedTime) - new Date(a.visitedTime));

  return history;
};

const Student = mongoose.model('students', StudentSchema);

module.exports = {
  Student
};