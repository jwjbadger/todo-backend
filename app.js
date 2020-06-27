var express = require('express');
var mongoose = require('mongoose');
var monConf = require('./mongoose.conf.json');
var bodyParser = require('body-parser');
var app = express();
// Parse post requests properly
app.use(bodyParser.json());
// Add headers so Angular works
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Methods');
    next();
});
// External Routes
var userRoute = require('./routes/users');
app.use('/users', userRoute);
// Routes
app.get('/', function (req, res, next) {
    res.send('Incorrect path');
});
// Mongoose (connecting to db)
mongoose.connect('mongodb://localhost:27017/todos', monConf, function () {
    console.log('Got database with options:');
    console.log(monConf);
});
// Listen
app.listen(3000);
