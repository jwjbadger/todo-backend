const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ err: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.token);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ err: 'Invalid Token' });
  }
};
