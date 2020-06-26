const express = require('express');
const mongoose = require('mongoose');
const monConf = require('./mongoose.conf.json');

const app = express();

// External Routes

const userRoute = require('./routes/users');
app.use('/users', userRoute);

// Routes

app.get('/', (req, res) => {
  res.send('ok');
});

// Mongoose (connecting to db)

mongoose.connect('mongodb://localhost:27017/users', monConf, () => {
  console.log(monConf);
});

// Listen

app.listen(3000);
