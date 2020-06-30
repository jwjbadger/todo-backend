const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const verify = require('./verify');

// Routes

// Login
router.post('/login', async (req, res) => {
  // Get from database
  const user = await User.findOne({ name: req.body.name });
  if (user == null)
    return res.status(400).json({ err: 'Invalid username/password' });

  // Password check
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ err: 'Invalid username/password' });

  // JWT
  const token = jwt.sign({ _id: user._id }, process.env.token);
  res.header('auth-token', token).json({ token: token });
});

// Register
router.post('/register', async (req, res) => {
  // Validate unique username
  const userCheck = await User.findOne({ name: req.body.name });
  if (userCheck != null) {
    return res.status(400).json({ err: 'Username already in use' });
  }

  if (
    verify.isEmptyOrSpaces(req.body.name) ||
    verify.isEmptyOrSpaces(req.body.password)
  ) {
    return res.status(400).json({ err: 'Invalid username/password' });
  }

  // Generate Salt
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Get user from input
  const user = new User({
    name: req.body.name,
    password: hashPassword,
    todos: req.body.todos,
  });

  // Save to the database
  try {
    const savedUser = await user.save();
    res.status(200).json({ _id: savedUser._id });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete user
router.delete('/:userId', verify.verify, async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.status(200).json(removedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Patch user
router.patch('/:userId', verify.verify, async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      { $set: { todos: req.body.todos } }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get todos
router.get('/:_id', verify.verify, async (req, res) => {
  try {
    const todos = await User.findOne({ _id: req.params._id });
    res.status(200).json(todos);
  } catch {
    res.status(400).json(err);
  }
});

module.exports = router;
