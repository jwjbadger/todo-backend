const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  completed: Boolean,
});

module.exports = TodoSchema;
