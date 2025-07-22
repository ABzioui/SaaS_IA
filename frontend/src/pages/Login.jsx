import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await login(email, password);
      if (res && res.user) {
        if (res.user.role === 'proprietaire') {
          navigate('/dashboard');
        } else if (res.user.role === 'locataire') {
          navigate('/page-vitrine');
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 400 }}>
        <Typography variant="h4" color="primary" fontWeight={700} mb={2} align="center">
          Login
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
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ fontWeight: 600, mt: 1 }}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
        <Box className="auth-links" sx={{ mt: 3, textAlign: 'center' }}>
          <Button component={Link} to="/forgot-password" color="secondary" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Forgot Password?
          </Button>
          <br />
          <Button component={Link} to="/register" color="secondary" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Don't have an account? Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login; 