var express = require('express');
var router = express.Router();

const User = require('../models/User');

// Routes

router.get('/:name', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    todos: req.body.todos,
  });

  // Save to the database
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
