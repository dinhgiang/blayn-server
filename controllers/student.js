const { Student } = require('../models/student.js');

const getAllStudents = async function(req, res) {
  let students = await Student.getAllStudents();
  res.send(students);
};

module.exports = {
  getAllStudents
};