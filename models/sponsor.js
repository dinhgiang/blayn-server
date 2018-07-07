const mongoose = require('mongoose');

const { Event } = require('./event.js');
const { User } = require('./user.js');

const SponsorSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  staffName: {
    type: String,
    required: true,
    trim: true
  },
  staffRubyName: {
    type: String,
    required: true,
    trim: true
  },
  companyAddress: {
    type: String,
    required: true
  },
  companyPhone: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: false,
    default: null
  },
  position: {
    type: String,
    required: false,
    default: null
  },
  logo: {
    type: String,
    required: false,
    default: null
  },
  CEOName: {
    type: String,
    required: true
  },
  dateOfEstablished: {
    type: String,
    required: true
  },
  numberOfEmployees: {
    type: Number,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  websiteURL: {
    type: String,
    required: true
  },
  introduction1: {
    type: String,
    required: true
  },
  introduction2: {
    type: String,
    required: false,
    default: null
  },
  deadline: {
    type: String,
  }
});

SponsorSchema.statics.getAll = () => {
  return Sponsor.find().select('-__v');
};

SponsorSchema.statics.getEvents = async (userId) => {
  const sponsor = await Sponsor.findOne({userId: userId});

  const events = await Event.find({sponsorId: sponsor._id}).select('-__v');
  return events;
};

SponsorSchema.statics.getProfile = async (userId) => {
  const user = await User.findById(userId);
  const sponsor = await Sponsor.findOne({userId : userId}).select('-__v');
  sponsor._doc.email = user.email;
  return sponsor;
};

const Sponsor = mongoose.model('sponsors', SponsorSchema);

module.exports = {
  Sponsor
};