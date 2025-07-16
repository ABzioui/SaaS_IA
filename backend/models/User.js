const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

class User {
  static async create({ email, password, firstName, lastName, phone, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (email, password_hash, first_name, last_name, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [email, hashedPassword, firstName, lastName, phone, role]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [
      hashedPassword,
      id,
    ]);
  }

  static async setResetToken(id, token, expires) {
    await query(
      'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3',
      [token, expires, id]
    );
  }

  static async clearResetToken(id) {
    await query(
      'UPDATE users SET reset_password_token = NULL, reset_password_expires = NULL WHERE id = $1',
      [id]
    );
  }

  static async findByResetToken(token) {
    const result = await query(
      'SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()',
      [token]
    );
    return result.rows[0];
  }
}

module.exports = User;