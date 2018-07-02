const { ObjectID } = require('mongodb');

const { Event } = require('../models/event');
const { Sponsor } = require('../models/sponsor');
const { Student } = require('../models/student');
const { User } = require('../models/User');

const userID1 = new ObjectID();
const userID2 = new ObjectID();
const userID3 = new ObjectID();

const sponsorID1 = new ObjectID();

const events = [{
  _id: new ObjectID(),
  title: "Free coffee",
  date: new Date("6-6-2018"),
  startingTime: new Date(2018, 06, 27, 14, 00, 00),
  endingTime: new Date(2018, 06, 27, 17, 00, 00),
  joinedStudents: 30,
  description: "",
  image: "",
  sponsorID: sponsorID1,
  status: "approve",
  unavaiableSeats: 20
}];

const sponsors = [{
  _id: sponsorID1,
  userID: userID3,
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
  timesPerMonth: 2
}];

const students = [{
  _id: new ObjectID(),
  userID: userID1,
  name: "Dinh Van Giang",
  avatar: "",
  addmistionYear: new Date(2020),
  department: "none",
  dateOfBirth: new Date(1998, 01, 01),
  studentCard: "none",
  image: "",
  studentNumber: 16020926,
  barcode: "asdf",
  status: "member"
}, {
  _id: new ObjectID(),
  userID: userID2,
  name: "Truong Hoang Giang",
  avatar: "",
  addmistionYear: new Date(2020),
  department: "none",
  dateOfBirth: new Date(1998, 03, 23),
  studentCard: "none",
  image: "",
  studentNumber: 16020928,
  barcode: "asdf",
  status: "under review"
}];

const users = [{
  _id : userID1,
  email: "dinhvangiang1198@gmail.com",
  role: "student"
}, {
  _id : userID2,
  email: "giangth2310@gmail.com",
  role: "student"
}, {
  _id : userID3,
  email: "dattq@gmail.com",
  role: "sponsor"
}];

Event.remove({}).then(() => {
  Event.insertMany(events).then((event) => {
    console.log(event);
  })
})
  
Sponsor.remove({}).then(() => {
  Sponsor.insertMany(sponsors).then((doc) => {
    console.log(doc);
    
  })
})

// Student.remove({}).then(() => {
//   var Student1 = new Student(students[0].save())
//   return Student1;
// })

// User.remove({}).then(() => {
//   var user1 = new Users(users[0].save());
//   var user2 = new Users(users[1].save());
// })

