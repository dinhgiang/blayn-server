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
}, {
  _id : new ObjectID(),
  email: "thaihuynhatquang@gmail.com",
  password: "12345678",
  role: "student"
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
  logo: 'public/images/sponsors/logo-1531127378543.png',
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
  logo: 'public/images/sponsors/logo-1531127378542.png',
  CEOName: "hissshi",
  dateOfEstablished: "02/10/2010",
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
  avatar: "public/images/students/avatar-1531126928823.png",
  admissionYear: "2016",
  department: "none",
  dateOfBirth: "01/01/1998",
  studentCard: "public/images/students/studentCard-1531126928825.png",
  studentNumber: "16020926",
  barcode: "12345678",
  status: "member",
  memberDeadline: "10/09/2020"
}, {
  _id: new ObjectID(),
  userId: user[1]._id,
  familyName: "Truong",
  givenName: "Hoang Giang",
  gender: "male",
  avatar: "public/images/students/avatar-1531127148314.png",
  admissionYear: "2016",
  department: "none",
  dateOfBirth: "10/23/1998",
  studentCard: "public/images/students/studentCard-1531127148315.png",
  studentNumber: "16020928",
  barcode: "12345000",
  status: "under review",
  memberDeadline: "08/20/2020"
}, {
  _id: new ObjectID(),
  userId: user[5]._id,
  familyName: "Thai",
  givenName: "Huy Nhat Quang",
  gender: "female",
  avatar: "public/images/students/avatar-1531232489214.png",
  admissionYear: "2016",
  department: "none",
  dateOfBirth: "07/02/1998",
  studentCard: "public/images/students/studentCard-1531232489216.png",
  studentNumber: "16020928",
  barcode: "12341235",
  status: "deactivated",
  memberDeadline: "08/30/2020"
}];

const event = [{
  _id: new ObjectID(),
  title: "Beer fest",
  date: "08/11/2018",
  startingTime: "05:00:00",
  endingTime: "17:00:00",
  joinedStudents: 3,
  description: "",
  image: "public/images/events/image-1531127624180.png",
  sponsorId: sponsor[0]._id,
  status: "approved",
  unavailableSeats: 0,
  followingStudents: [{
    studentId: student[0]._id,
    visitedTime: "08/01/2018 10:30:00"
  }, {
    studentId: student[1]._id
  }, {
    studentId: student[2]._id
  }],
  maxStudents: 12
}, {
  _id: new ObjectID(),
  title: "Good morning English cafe",
  date: "09/09/2018",
  startingTime: "14:00:00",
  endingTime: "17:00:00",
  joinedStudents: 0,
  description: "",
  image: "public/images/events/image-1531127624181.png",
  sponsorId: sponsor[0]._id,
  status: "under review",
  unavailableSeats: 0,
  followingStudents: [],
  maxStudents: 10
}, {
  _id: new ObjectID(),
  title: "Get out and play... everyday!",
  date: "09/06/2018",
  startingTime: "14:00:00",
  endingTime: "17:00:00",
  joinedStudents: 0,
  description: "asfd",
  image: "public/images/events/image-1531127624182.png",
  sponsorId: sponsor[0]._id,
  status: "approved",
  unavailableSeats: 0,
  followingStudents: [],
  maxStudents: 8
}, {
  _id: new ObjectID(),
  title: "Color splatter",
  date: "08/10/2018",
  startingTime: "02:00:00",
  endingTime: "20:00:00",
  joinedStudents: 1,
  description: "asfd",
  image: "public/images/events/image-1531127624183.png",
  sponsorId: sponsor[0]._id,
  status: "approved",
  unavailableSeats: 0,
  followingStudents: [{
    studentId: student[2]._id,
    visitedTime: "07/20/2018 10:30:00"
  }],
  maxStudents: 2
}, {
  _id: new ObjectID(),
  title: "MOVE",
  date: "08/23/2018",
  startingTime: "19:00:00",
  endingTime: "20:00:00",
  joinedStudents: 0,
  description: "asfd",
  image: "public/images/events/image-1531127624184.png",
  sponsorId: sponsor[0]._id,
  status: "denied",
  unavailableSeats: 0,
  followingStudents: [],
  maxStudents: 8
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