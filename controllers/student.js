const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const { Student } = require('../models/student.js');

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
  let student = req.body;
  student.avatar = req.files.avatar[0].path;
  student.studentCard = req.files.studentCard[0].path;
  console.log(student);
  
  // await Student.createNew(student);
};

module.exports = {
  getAll,
  getProfile,
  getHistory,
  downloadCsv,
  signup
};