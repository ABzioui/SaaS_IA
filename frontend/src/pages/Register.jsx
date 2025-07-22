import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'locataire',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await register(form);
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
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, minWidth: 350, maxWidth: 400 }}>
        <Typography variant="h4" color="primary" fontWeight={700} mb={2} align="center">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="email" type="email" label="Email" value={form.email} onChange={handleChange} required fullWidth />
          <TextField name="password" type="password" label="Password" value={form.password} onChange={handleChange} required fullWidth />
          <TextField name="firstName" type="text" label="First Name" value={form.firstName} onChange={handleChange} required fullWidth />
          <TextField name="lastName" type="text" label="Last Name" value={form.lastName} onChange={handleChange} required fullWidth />
          <TextField name="phone" type="text" label="Phone" value={form.phone} onChange={handleChange} fullWidth />
          <FormControl fullWidth required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={form.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="locataire">Locataire</MenuItem>
              <MenuItem value="proprietaire">Propriétaire</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ fontWeight: 600, mt: 1 }}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
        <Box className="auth-links" sx={{ mt: 3, textAlign: 'center' }}>
          <Button component={Link} to="/login" color="secondary" sx={{ textTransform: 'none', fontWeight: 500 }}>
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register; 