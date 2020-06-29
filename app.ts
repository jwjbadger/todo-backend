const express = require('express');
const mongoose = require('mongoose');
const monConf = require('./mongoose.conf.json');
var sanitize = require('mongo-sanitize');
const dotenv = require('dotenv');

const app = express();

// Use .env
dotenv.config();

// Parse post requests properly
app.use(express.json());

// Add headers so Angular works
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH');
  res.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Methods, Access-Control-Allow-Headers, auth-token'
  );
  req.body = sanitize(req.body);
  next();
});

// External Routes

const userRoute = require('./routes/users');
app.use('/users', userRoute);

// Routes

app.get('/', (req, res) => {
  res.json({ err: 'Incorrect path' });
});

// Mongoose (connecting to db)

mongoose.connect('mongodb://localhost:27017/todos', monConf, () => {
  console.log('Got database with options:');
  console.log(monConf);
});

// Listen

app.listen(3000);
