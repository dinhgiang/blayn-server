const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user.js');

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

module.exports = {
  login
}