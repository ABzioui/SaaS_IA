const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const jwtConfig = require('../config/jwt');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await query('SELECT * FROM users WHERE id = $1', [decoded.id]);
    
    if (!user.rows.length) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Token is not valid' });
  }
};