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

module.exports = {
  getAll,
  getProfile,
  getHistory
};