const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const { Student } = require('../models/student.js');
const { Event } = require('../models/event.js');
const { isEmail, isDateString } = require('../utilities/validate.js');

const getAll = async (req, res) => {
  const students = await Student.getAll();
  res.send(students);
};

const getProfile = async (req, res) => {
  const student = await Student.getProfile(req.sender._id);
  res.send(student);
};

const getHistory = async (req, res) => {
  const history = await Student.getHistory(req.sender._id);
  res.send(history);
};

const downloadCsv = async (req, res) => {
  try {
    const csvPath = './public/csv/students.csv';
    const students = await Student.getAll();
    
    if (fs.existsSync(csvPath)) {
      fs.unlinkSync(csvPath);
    }
    
    const csvWriter = createCsvWriter({
      path: csvPath,
      header: [
        { id: 'familyName', title: 'Family name'},
        { id: 'givenName', title: 'Given name'},
        { id: 'gender', title: 'Gender'},
        { id: 'admissionYear', title: 'Admission year'},
        { id: 'department', title: 'Department'},
        { id: 'dateOfBirth', title: 'Date of birth'},
        { id: 'studentNumber', title: 'Student number'},
        { id: 'status', title: 'Status'}
      ]
    });
    
    await csvWriter.writeRecords(students);
    
    res.sendFile(path.join(__dirname, '..', csvPath));
  } catch (err) {
    res.status(404).send({
      message: 'File not found'
    });
  };
};

const signup = async (req, res) => {
  const student = req.body;
  student.avatar = req.files.avatar[0].path;
  student.studentCard = req.files.studentCard[0].path;
  student.role = "student";
  
  try {
    if (!student.password) {
      throw new Error("password is required");
    }
    if (student.password.length < 8) {
      throw new Error("password is too short");
    } 
    if (!isEmail(student.email)) {
      throw new Error("email is invalid");
    }
    
    const newStudent = await Student.createNew(student);
    res.status(200).send(newStudent);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
};

const applyEvent = async (req, res) => {
  const studentId = req.sender._id;
  const eventId = req.body.eventId;

  if (req.body.apply) {
    const result = await Event.addFollowingStudent(studentId, eventId);
    res.send(result);
  } else {
    const result = await Event.removeFollowingStudent(studentId, eventId);
    res.send(result);
  }
};

const editProfile =  async (req, res) => {
  const student = req.body;
  student.userId = req.sender._id;

  if (!req.body.avatar) {
    student.avatar = req.files.avatar[0].path;
  }
  if (!req.body.studentCard) {
    student.studentCard = req.files.studentCard[0].path;
  }

  try {
    if (req.sender.role !== 'student') {
      throw new Error("user isn't student");
    }
    if (!isDateString(student.dateOfBirth)) {
      throw new Error("date is invalid");
    }

    const result = await Student.editProfile(student);
    res.send(result);
  } catch (err) {
    res.send({message: err.message});
  }
};

module.exports = {
  getAll,
  getProfile,
  getHistory,
  downloadCsv,
  signup,
  applyEvent,
  editProfile
};