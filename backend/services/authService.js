const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const jwtConfig = require('../config/jwt');

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.accessTokenExpiresIn }
  );
};

exports.generateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign(
    { id: userId },
    jwtConfig.secret,
    { expiresIn: jwtConfig.refreshTokenExpiresIn }
  );

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, refreshToken, expiresAt]
  );

  return refreshToken;
};