require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const { mongoose } = require('./db/mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  let token = jwt.sign({
    username: 'giang'
  }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
  res.send(token);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is up on port ', port);
})