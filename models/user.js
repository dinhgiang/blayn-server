const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String
  },
  role: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};