const express = require('express');
const mongoose = require('mongoose');
const monConf = require('./mongoose.conf.json');
const bodyParser = require('body-parser');

const app = express();

// Parse post requests properly
app.use(bodyParser.json());

// External Routes

const userRoute = require('./routes/users');
app.use('/users', userRoute);

// Routes

app.get('/', (req, res) => {
  res.send('Incorrect path, try another');
});

// Mongoose (connecting to db)

mongoose.connect('mongodb://localhost:27017/todos', monConf, () => {
  console.log('Got database with options:');
  console.log(monConf);
});

// Listen

app.listen(3000);
