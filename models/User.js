const mongoose = require('mongoose');

const Todo = require('../models/Todo');

const UserSchema = mongoose.Schema({
  name: String,
  todos: {
    type: [Todo],
  },
});

module.exports = mongoose.model('User', UserSchema);
