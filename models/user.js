const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  
  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.getUser = (email) => {
    return User.findOne({email: email}).select('-__v');
};

UserSchema.statics.changePassword = async user => {
  const currentUser = await User.findById(user._id);
  currentUser.password = user.password;
  return currentUser.save();
};

const User = mongoose.model('users', UserSchema);

module.exports = {
  User
};