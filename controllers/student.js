const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const jwt = require('jsonwebtoken');

const { Student } = require('../models/student.js');
const { Event } = require('../models/event.js');
const { User } = require('../models/user.js');
const { isEmail, isDateString, isPassword } = require('../utilities/validate.js');

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

  try {
    if (!req.files.avatar) {
      throw new Error("avatar is required");
    }
    if (!req.files.studentCard) {
      throw new Error("studentCard is required");
    }
    if (!student.password) {
      throw new Error("password is required");
    }
    if (!isPassword(student.password)) {
      throw new Error("password is too short");
    } 
    if (!isEmail(student.email)) {
      throw new Error("email is invalid");
    }

    student.avatar = req.files.avatar[0].path;
    student.studentCard = req.files.studentCard[0].path;
    student.role = "student";
    student.barcode = Math.random().toString().substring(2,10);
    
    const newStudent = await Student.createNew(student);
    res.status(200).send(newStudent);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
};

const applyEvent = async (req, res) => {
  const student = await Student.getProfile(req.sender._id);
  const studentId = student._id;
  const eventId = req.body.eventId;
  try {
    if (req.body.apply) {
      const result = await Event.addFollowingStudent(studentId, eventId);
      // check if mongoose can not modify document
      if (!result.nModified) {
        throw new Error("can not follow this event");
      }
      res.send({message: "followed"});
    } else {
      const result = await Event.removeFollowingStudent(studentId, eventId);
      if (!result.nModified) {
        throw new Error("can not unfollow this event");
      }
      res.send({message: "unfollowed"});
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const editProfile =  async (req, res) => {
  const student = req.body;
  student.userId = req.sender._id;
  
  try {
    if (!req.body.avatar && !req.files.avatar) {
      throw new Error("avatar is required");
    }
    if (!req.body.studentCard && !req.files.studentCard) {
      throw new Error("studentCard is required");
    }
    if (!req.body.avatar) {
      student.avatar = req.files.avatar[0].path;
    }
    if (!req.body.studentCard) {
      student.studentCard = req.files.studentCard[0].path;
    }
    if (req.sender.role !== 'student') {
      throw new Error("user isn't student");
    }
    if (!isDateString(student.dateOfBirth)) {
      throw new Error("date is invalid");
    }

    const result = await Student.editProfile(student);
    
    if (!result.nModified) {
      throw new Error("can not update this student");
    }
    res.send({message: "updated"});
  } catch (err) {
    res.status(400).send({message: err.message});
  }
};

const approve = async (req, res) => {
  const student = new Object();
  student.studentId = req.body.studentId;

  try {
    if (req.sender.role !== "root") {
      throw new Error("user isn't root");
    }
    if (req.body.approve) {
      student.status = "member";
    } else {
      student.status = "deactivated";
    }
    
    const result = await Student.approve(student);

    if (!result.nModified) {
      if (req.body.approve) {
        throw new Error("can't approve this event");
      } else {
        throw new Error("can't deactive this event");
      }
    }

    if (req.body.approve) {
      res.send({message: "approved"});
    } else {
      res.send({message: "deactivated"})
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

const resetPassword = async (req, res) => {
  const user = await User.getUser(req.body.email);
  if (!user) {
    return res.status(400).send('can not find this user');
  };

  const student = await Student.getProfile(user._id);
  if (!student) {
    return res.status(400).send('can not find this student');
  };

  const token = jwt.sign({
    _id: user._id,
    role: user.role
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.RESET_PASSWORD_EXPIRES_IN
  })

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD
    }
  });

  const handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./utilities'),
    extName: '.html'
  };

  transporter.use('compile', hbs(handlebarsOptions));
  
  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: req.body.email,
    subject: 'Reset password',
    template: 'reset-password',
    context: {
      url: 'blayncafe://reset-password/token=' + token,
      name: student.givenName
    }
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(202).send(error);
    } else {
      res.send({message: "sent email"})
    }
  });
};

module.exports = {
  getAll,
  getProfile,
  getHistory,
  downloadCsv,
  signup,
  applyEvent,
  editProfile,
  approve,
  resetPassword
};