import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" elevation={3} sx={{ borderRadius: 3, mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 72 }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ color: 'secondary.main', textDecoration: 'none', fontWeight: 700, letterSpacing: 2 }}
        >
          SaaS_IA
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {user && (
            <Button component={Link} to="/profile" color="secondary" variant="outlined" sx={{ fontWeight: 600 }}>
              Profile
            </Button>
          )}
          {user && user.role === 'proprietaire' && (
            <Button component={Link} to="/admin" color="secondary" variant="outlined" sx={{ fontWeight: 600 }}>
              Admin
            </Button>
          )}
          {!user && (
            <Button component={Link} to="/login" color="secondary" variant="contained" sx={{ fontWeight: 600 }}>
              Login
            </Button>
          )}
          {!user && (
            <Button component={Link} to="/register" color="secondary" variant="outlined" sx={{ fontWeight: 600 }}>
              Register
            </Button>
          )}
          {user && (
            <Button onClick={handleLogout} color="secondary" variant="contained" sx={{ fontWeight: 600 }}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 