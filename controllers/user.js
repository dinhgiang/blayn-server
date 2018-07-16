const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user.js');
const { isPassword } = require('../utilities/validate.js');

const login = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.getUser(id);
    
    if (user == null) {
      throw new Error('Invalid username');
    } 
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({
        _id: user._id,
        role: user.role
      }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_IN 
      });

      res.send({
        token,
        expiresIn: process.env.TOKEN_EXPIRES_IN,
        _id: user._id,
        role: user.role
      });
    } else {
      throw new Error('Invalid password');
    }
  } catch (e) {
    res.status(401).send({
      message: e.message
    });
  };
};

const changeStudentPassword = async (req, res) => {
  const user = {
    _id: req.sender._id,
    role: req.sender.role,
    password: req.body.newPassword
  }

  try {
    if (user.role !== "student") {
      throw new Error("user isn't student");
    }
    if (!isPassword(user.password)) {
      throw new Error("password is invalid");
    }

    const result = await User.changePassword(user);
    res.send(result);
  } catch (error) {
    res.status(400).send({message: error.message});
  }
}

module.exports = {
  login,
  changeStudentPassword
}