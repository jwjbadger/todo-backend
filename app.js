var express = require('express');
var mongoose = require('mongoose');
var monConf = require('./mongoose.conf.json');
var bodyParser = require('body-parser');
var app = express();
// Parse post requests properly
app.use(bodyParser.json());
// External Routes
var userRoute = require('./routes/users');
app.use('/users', userRoute);
// Routes
app.get('/', function (req, res) {
    res.send('Incorrect path, try another');
});
// Mongoose (connecting to db)
mongoose.connect('mongodb://localhost:27017/todos', monConf, function () {
    console.log('Got database with options:');
    console.log(monConf);
});
// Listen
app.listen(3000);
