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
    type: String
  },
  role: {
    type: String
  }
});

UserSchema.statics.getUser = (id) => {
  return User.findOne({email: id});
};

UserSchema.statics.getUserBy_Id = (_id) => {
  return User.findById(_id);
};

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

const User = mongoose.model('users', UserSchema);

module.exports = {
  User
};