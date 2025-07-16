import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await authService.forgotPassword(email);
      setMessage('If the email exists, a reset link has been sent.');
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 400 }}>
        <Typography variant="h4" color="primary" fontWeight={700} mb={2} align="center">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ fontWeight: 600, mt: 1 }}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
        </Box>
        <Box className="auth-links" sx={{ mt: 3, textAlign: 'center' }}>
          <Button component={Link} to="/login" color="secondary" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword; 