const mongoose = require('mongoose');

const SponsorSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
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
    type: Number,
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
    type: Date,
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
  timesPerMonth: {
    type: Number,
    require: false,
    default: 0
  },
  deadline: {
    type: Date,
  }
});

SponsorSchema.statics.getAllSponsors = function() {
  return Sponsor.find();
};

const Sponsor = mongoose.model('sponsors', SponsorSchema);

module.exports = {
  Sponsor
};