var express = require('express');
var mongoose = require('mongoose');
var monConf = require('./mongoose.conf.json');
var app = express();
// External Routes
var userRoute = require('./routes/users');
app.use('/users', userRoute);
// Routes
app.get('/', function (req, res) {
    res.send('ok');
});
// Mongoose (connecting to db)
mongoose.connect('mongodb://localhost:27017/users', monConf, function () {
    console.log(monConf);
});
// Listen
app.listen(3000);
