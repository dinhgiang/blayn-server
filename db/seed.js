const { ObjectID } = require('mongodb');

const { Event } = require('../models/event');
const { Sponsor } = require('../models/sponsor');
const { Student } = require('../models/student');
const { User } = require('../models/user');

const user = [{
  _id : new ObjectID(),
  email: "dinhvangiang1198@gmail.com",
  password: "12345678",
  role: "student"
}, {
  _id : new ObjectID(),
  email: "giangth2310@gmail.com",
  password: "12345678",
  role: "student"
}, {
  _id : new ObjectID(),
  email: "dattq@gmail.com",
  password: "12345678",
  role: "sponsor"
}, {
  _id : new ObjectID(),
  email: "blayn",
  password: "12345678",
  role: "root"
}, {
  _id : new ObjectID(),
  email: "sponsor@gmail.com",
  password: "12345678",
  role: "sponsor"
}];

const sponsor = [{
  _id: new ObjectID(),
  userId: user[2]._id,
  companyName: "UET",
  staffName: "Truong Quoc Dat",
  staffRubyName: "dat9.8",
  companyAddress: "144 xuan thuy",
  companyPhone: "01234567",
  department: "E3",
  position: "leader",
  logo: '../images/Framgia.jpg',
  CEOName: "hihi",
  dateOfEstablished: "01/01/2010",
  numberOfEmployees: 1000,
  industry: "none",
  websiteURL: "https://uet.vnu.edu.vn",
  introduction1: "this is introduction",
  deadline: ''
}, {
  _id: new ObjectID(),
  userId: user[4]._id,
  companyName: "UET",
  staffName: "sponsor",
  staffRubyName: "sponsor",
  companyAddress: "xuan thuy",
  companyPhone: "01234567",
  department: "",
  position: "leader",
  logo: '../images/Framgia.jpg',
  CEOName: "hissshi",
  dateOfEstablished: "10/01/2010",
  numberOfEmployees: 1000,
  industry: "none",
  websiteURL: "https://uet.vnu.edu.vn",
  introduction1: "this is introduction",
  deadline: ''
}];

const student = [{
  _id: new ObjectID(),
  userId: user[0]._id,
  familyName: "Dinh",
  givenName: "Van Giang",
  gender: "male",
  avatar: "",
  admissionYear: "2016",
  department: "none",
  dateOfBirth: "01/01/1998",
  studentCard: "none",
  studentNumber: "16020926",
  barcode: "asdf",
  status: "member",
  memberDeadline: "10/09/2020"
}, {
  _id: new ObjectID(),
  userId: user[1]._id,
  familyName: "Truong",
  givenName: "Hoang Giang",
  gender: "male",
  avatar: "",
  admissionYear: "2016",
  department: "none",
  dateOfBirth: "23/10/1998",
  studentCard: "none",
  studentNumber: "16020928",
  barcode: "asdf",
  status: "under review",
  memberDeadline: "20/08/2020"
}, {
  _id: new ObjectID(),
  userId: user[1]._id,
  familyName: "Thai",
  givenName: "Huy Nhat Quang",
  gender: "female",
  avatar: "",
  admissionYear: "2016",
  department: "none",
  dateOfBirth: "02/07/1998",
  studentCard: "none",
  studentNumber: "16020928",
  barcode: "asdf",
  status: "under review",
  memberDeadline: "30/08/2020"
}];

const event = [{
  _id: new ObjectID(),
  title: "Free coffee",
  date: "09/09/2018",
  startingTime: new Date("2018-06-27T14:00:00"),
  endingTime: new Date("2018-06-27T17:00:00"),
  joinedStudents: 30,
  description: "",
  image: "",
  sponsorId: sponsor[0]._id,
  status: "end",
  unavailableSeats: 20,
  followingStudents: [{
    studentId: student[0]._id,
    visitedTime: new Date("2018-07-20T10:30:00")
  }, {
    studentId: student[1]._id,
    visitedTime: new Date("2017-07-20T10:30:00")
  }]
}, {
  _id: new ObjectID(),
  title: "Free cafe",
  date: "06/06/2018",
  startingTime: new Date("2018-06-27T14:00:00"),
  endingTime: new Date("2018-06-27T17:00:00"),
  joinedStudents: 50,
  description: "asfd",
  image: "",
  sponsorId: sponsor[0]._id,
  status: "holding",
  unavailableSeats: 10,
  followingStudents: [{
    studentId: student[1]._id,
    visitedTime: new Date("2018-07-20T10:30:00")
  }]
}];

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
  user.forEach(el => {
    const e = new User(el);
    e.save();
  })
});