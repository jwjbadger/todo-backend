var express = require('express');
var router = express.Router();

const User = require('../models/User');

// Routes

router.get('/', (req, res) => {
  res.send('Nice');
});

router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    todos: req.body.todos,
  });

  // Save to the database
  user
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
