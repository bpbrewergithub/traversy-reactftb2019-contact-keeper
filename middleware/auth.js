const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if token exists
  if(!token) {
    return res.status(401).json({ msg: 'No token, authorisation denied'});
  }

  try {
    // Verify token and extract the payload
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Set the user in the payload to request.user to have access
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}