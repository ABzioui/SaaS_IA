const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');
const { generateToken, generateRefreshToken } = require('../services/authService');
const emailService = require('../services/emailService');
const { validateRegisterInput, validateLoginInput } = require('../services/validators');
const { query } = require('../config/db');

exports.register = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password, firstName, lastName, phone, role } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ email: 'Email already exists' });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
    });

    // In a real app, you would send a verification email here
    // await emailService.sendVerificationEmail(user.email, verificationToken);

    const token = generateToken(user);
    const refreshToken = await generateRefreshToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ email: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ password: 'Invalid credentials' });
    }

    const token = generateToken(user);
    const refreshToken = await generateRefreshToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
      }
  
      // Utilisez query pour vérifier le token en base
      const result = await query(
        'SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
        [refreshToken]
      );
  
      if (!result.rows.length) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
      }
  
      const user = await User.findById(result.rows[0].user_id);
      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }
  
      const newToken = generateToken(user);
      res.json({ token: newToken });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findByEmail(email);
      if (!user) return res.json({ message: 'If the email exists, a reset link has been sent' });
  
      // Génère un token spécifique pour la réinitialisation
      const resetToken = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: '1h' });
      const resetExpires = new Date(Date.now() + 3600000); // 1 heure
  
      await User.setResetToken(user.id, resetToken, resetExpires);
      await emailService.sendPasswordResetEmail(user.email, resetToken);
  
      res.json({ message: 'If the email exists, a reset link has been sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      // 1. Vérifiez que le token et le nouveau mot de passe sont présents
      if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
      }
  
      // 2. Trouvez l'utilisateur avec un token valide
      const user = await User.findByResetToken(token);
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // 3. Mettez à jour le mot de passe
      await User.updatePassword(user.id, newPassword);
      await User.clearResetToken(user.id);
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    await query(
      'UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE id = $4',
      [firstName, lastName, phone, req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};