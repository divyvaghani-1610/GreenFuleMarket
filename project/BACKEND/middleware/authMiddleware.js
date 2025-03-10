const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization'); // Get token from header
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  // const JWT_SECRET = "sdbduen474hrn930r3t8tikgor9jgfkdjgsgj"; // Use environment variable in production

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Correct verification
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
