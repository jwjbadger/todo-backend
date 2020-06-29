var express = require('express');
var mongoose = require('mongoose');
var monConf = require('./mongoose.conf.json');
var sanitize = require('mongo-sanitize');
var dotenv = require('dotenv');
var app = express();
// Use .env
dotenv.config();
// Parse post requests properly
app.use(express.json());
// Add headers so Angular works
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Methods, Access-Control-Allow-Headers, auth-token');
    req.body = sanitize(req.body);
    next();
});
// External Routes
var userRoute = require('./routes/users');
app.use('/users', userRoute);
// Routes
app.get('/', function (req, res) {
    res.json({ err: 'Incorrect path' });
});
// Mongoose (connecting to db)
mongoose.connect('mongodb://localhost:27017/todos', monConf, function () {
    console.log('Got database with options:');
    console.log(monConf);
});
// Listen
app.listen(3000);
