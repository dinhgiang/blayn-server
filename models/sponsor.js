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
    require: false
  },
  position: {
    type: String,
    require: false
  },
  logo: {
    type: String,
    require: false
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
    require: false
  },
  timesPerMonth: {
    type: Number,
    require: false,
    default: 0
  },
})

const Sponsor = mongoose.model('Sponsor', SponsorSchema);

module.exports = {
  Sponsor
};