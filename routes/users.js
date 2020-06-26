var express = require('express');
var router = express.Router();

const User = require('../models/User');

// Routes

router.get('/:name', async (req, res) => {
  // Get from database
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

router.delete('/:userId', async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.status(200).json(removedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { todos: req.body.todos } }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
