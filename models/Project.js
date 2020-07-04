const mongoose = require('mongoose');

const Todo = require('./Todo');

const UserSchema = mongoose.Schema({
  name: String,
  password: String,
  todos: {
    type: [Todo],
  },
});

const ProjectSchema = mongoose.Schema({
  title: String,
  description: String,
  users: {
    type: [String],
  },
  todos: {
    type: [Todo],
  },
});

ProjectSchema.set('collection', 'projects');

module.exports = mongoose.model('Project', ProjectSchema);
