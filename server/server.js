require('./config/config');
const express = require('express');

const app = express();
const { mongoose } = require('./db/mongoose');

app.get('/', (req, res) => {
  res.send('nani');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is up on port ', port);
})