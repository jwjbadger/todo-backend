const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

const verify = require('./verify');

// Post a new project to the project list
router.post('/', verify.verify, async (req, res) => {
  try {
    if (verify.isEmptyOrSpaces(req.body.users[0])) {
      return res.status(400).json({ err: 'Invalid users' });
    }
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      users: req.body.users,
      todos: req.body.todos,
    });

    const newProject = await project.save();
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get projects where that user is included
router.get('/:user', verify.verify, async (req, res) => {
  try {
    const projects = await Project.find({ users: req.params.user });
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
