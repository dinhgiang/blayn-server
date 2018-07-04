require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { mongoose } = require('./db/mongoose');

const router = require('./router/router')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api', router);

// require('./db/seed');

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is up on port ', port);
})