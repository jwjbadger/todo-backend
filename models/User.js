const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  todos: {
    id: Number,
    title: String,
    description: String,
    completed: Boolean,
  },
});

module.exports = mongoose.model('User', UserSchema);
