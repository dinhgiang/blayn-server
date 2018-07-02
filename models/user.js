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

const User = mongoose.model('users', UserSchema);

module.exports = {
  User
};