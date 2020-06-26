const express = require('express');
const mongoose = require('mongoose');
const monConf = require('./mongoose.conf.json');
const bodyParser = require('body-parser');

const app = express();

// Parse post requests properly
app.use(bodyParser.json());

// Add headers so Angular works
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  next();
});

// External Routes

const userRoute = require('./routes/users');
app.use('/users', userRoute);

// Routes

app.get('/', (req, res, next) => {
  res.send('Incorrect path');
});

// Mongoose (connecting to db)

mongoose.connect('mongodb://localhost:27017/todos', monConf, () => {
  console.log('Got database with options:');
  console.log(monConf);
});

// Listen

app.listen(3000);
