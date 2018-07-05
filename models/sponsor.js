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
    require: true,
    trim: true
  },
  staffRubyName: {
    type: String,
    require: true,
    trim: true
  },
  companyAddress: {
    type: String,
    require: true
  },
  companyPhone: {
    type: String,
    require: true
  },
  department: {
    type: String,
    require: false,
    default: null
  },
  position: {
    type: String,
    require: false,
    default: null
  },
  logo: {
    type: String,
    require: false,
    default: null
  },
  CEOName: {
    type: String,
    require: true
  },
  dateOfEstablished: {
    type: String,
    require: true
  },
  numberOfEmployees: {
    type: Number,
    require: true
  },
  industry: {
    type: String,
    require: true
  },
  websiteURL: {
    type: String,
    require: true
  },
  introduction1: {
    type: String,
    require: true
  },
  introduction2: {
    type: String,
    require: false,
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