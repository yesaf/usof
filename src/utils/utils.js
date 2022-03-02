const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');

const getUserJWT = (bearer) => {
  const [, token] = bearer.split(' ');
  return jwt.verify(token, JWT_KEY);
}



module.exports = {
  getUserJWT,
}
