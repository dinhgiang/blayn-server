const jwt = require('jsonwebtoken');

const { User } = require('../models/user.js')

const authenticate = async (req, res, next) => {
  var token = req.header('x-auth');

  try {
    await jwt.verify(token, process.env.JWT_SECRET);
    req.sender = jwt.decode(token);
    next();
  } catch (e) {
    res.status(401).send({message: e.message});
  }
}

module.exports = {
  authenticate
}