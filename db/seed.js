const { ObjectID } = require('mongodb');

const { Event } = require('../models/event');
const { Sponsor } = require('../models/sponsor');
const { Student } = require('../models/student');
const { User } = require('../models/user');
const { EventStudent } = require('../models/event_student');

const user = [{
  _id : new ObjectID(),
  email: "dinhvangiang1198@gmail.com",
  role: "student"
}, {
  _id : new ObjectID(),
  email: "giangth2310@gmail.com",
  role: "student"
}, {
  _id : new ObjectID(),
  email: "dattq@gmail.com",
  role: "sponsor"
}];

const sponsor = [{
  _id: new ObjectID(),
  userID: user[2]._id,
  companyName: "UET",
  staffName: "Truong Quoc Dat",
  staffRubyName: "dat9.8",
  companyAddress: "144 xuan thuy",
  companyPhone: 01234567,
  department: "E3",
  position: "leader",
  logo: "",
  CEOName: "hihi",
  dateOfEstablished: new Date(2010),
  numberOfEmployees: 1000,
  industry: "none",
  websiteURL: "https://uet.vnu.edu.vn",
  introduction1: "this is introduction",
  timesPerMonth: 2,
  deadline: ''
}];

const event = [{
  _id: new ObjectID(),
  title: "Free coffee",
  date: new Date("6-6-2018"),
  startingTime: new Date(2018, 06, 27, 14, 00, 00),
  endingTime: new Date(2018, 06, 27, 17, 00, 00),
  joinedStudents: 30,
  description: "",
  image: "",
  sponsorID: sponsor[0]._id,
  status: "approve",
  unavailableSeats: 20
}];

const student = [{
  _id: new ObjectID(),
  userID: user[0]._id,
  familyName: "Dinh",
  givenName: "Van Giang",
  gender: "male",
  avatar: "",
  admissionYear: new Date(2016),
  department: "none",
  dateOfBirth: new Date(1998, 01, 01),
  studentCard: "none",
  studentNumber: 16020926,
  barcode: "asdf",
  status: "member",
  memberDeadline: new Date(2018, 08, 20)
}, {
  _id: new ObjectID(),
  userID: user[1]._id,
  familyName: "Truong",
  givenName: "Hoang Giang",
  gender: "male",
  avatar: "",
  admissionYear: new Date(2016),
  department: "none",
  dateOfBirth: new Date(1998, 03, 23),
  studentCard: "none",
  studentNumber: 16020928,
  barcode: "asdf",
  status: "under review",
  memberDeadline: new Date(2018, 08, 20)
}];

const event_student = [{
  _id : new ObjectID(),
  studentID: student[1]._id,
  eventID: event[0]._id,
  status: "follow",
  visitedTime: new Date(2018, 07, 30)
}]

Event.remove({}).then(() => {
  Event.insertMany(event);
});
  
Sponsor.remove({}).then(() => {
  Sponsor.insertMany(sponsor);
});

Student.remove({}).then(() => {
  Student.insertMany(student);
});

User.remove({}).then(() => {
  User.insertMany(user);
});

EventStudent.remove({}).then(() => {
  EventStudent.insertMany(event_student);
});