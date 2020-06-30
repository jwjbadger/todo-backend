const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

const verify = require('./verifyToken');

// Get projects where that user is included
router.get('/:_id', verify, async (req, res) => {
  try {
    const projects = await Project.find({ users: req.params._id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
