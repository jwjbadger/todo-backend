const mongoose = require('mongoose');

const Todo = require('./Todo');

const UserSchema = mongoose.Schema({
  name: String,
  password: String,
  todos: {
    type: [Todo],
  },
});

UserSchema.set('collection', 'users');

module.exports = mongoose.model('User', UserSchema);
