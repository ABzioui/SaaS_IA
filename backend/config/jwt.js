require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET,
  accessTokenExpiresIn: '15m',
  refreshTokenExpiresIn: '7d',
};