const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"
  if (!token)
    return res.status(401).json({ error: 'Unauthorized request' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user data for use in next steps
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
