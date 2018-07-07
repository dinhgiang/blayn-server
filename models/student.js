const mongoose = require('mongoose');

const { Event } = require('./event.js');
const { User } = require('./user.js');

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
    required: false
  },
  admissionYear: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true,
    default: 0
  },
  studentCard: {
    type: String,
    required: true
  },
  studentNumber: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    require: true
  },
  status: {
    type: String,
    required: false,
    default: "under review"
  },
  memberDeadline: {
    type: String,
    required: false
  }
});

StudentSchema.statics.getAll = () => {
  return Student.find().select('-__v');
};

StudentSchema.statics.getProfile = async (userId) => {
  const user = await User.findById(userId);
  const student = await Student.findOne({ userId: userId }).select('-__v');
  
  student._doc.email = user.email;
  return student;  
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

StudentSchema.statics.createNew = async (student) => {
  const user = new User(student);
  const newUser = await user.save();
  const newStudent = new Student(student);
  newStudent.userId = newUser._id;
  return await newStudent.save();
};

const Student = mongoose.model('students', StudentSchema);

module.exports = {
  Student
};