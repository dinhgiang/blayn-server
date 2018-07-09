require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const { mongoose } = require('./db/mongoose');

const router = require('./router/router')

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/public', express.static('public'));

app.use('/api', router);

require('./db/seed');

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is up on port ', port);
})