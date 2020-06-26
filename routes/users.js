var express = require('express');
var router = express.Router();

// Routes

router.get('/', (req, res) => {
  res.send('Nice');
});

module.exports = router;
