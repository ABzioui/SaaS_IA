import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, useMediaQuery } from '@mui/material';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {user && (
        <>
          <Button
            component={Link}
            to="/properties"
            color="secondary"
            variant={isActive('/properties') ? 'contained' : 'outlined'}
            startIcon={<ApartmentIcon />}
            sx={{ fontWeight: 600 }}
          >
            Properties
          </Button>
          <Button
            component={Link}
            to="/properties/add"
            color="secondary"
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ fontWeight: 600 }}
          >
            Add Property
          </Button>
          <Button
            component={Link}
            to="/profile"
            color="secondary"
            variant={isActive('/profile') ? 'contained' : 'outlined'}
            startIcon={<AccountCircleIcon />}
            sx={{ fontWeight: 600 }}
          >
            Profile
          </Button>
        </>
      )}
      {user && user.role === 'proprietaire' && (
        <Button
          component={Link}
          to="/admin"
          color="secondary"
          variant={isActive('/admin') ? 'contained' : 'outlined'}
          startIcon={<AdminPanelSettingsIcon />}
          sx={{ fontWeight: 600 }}
        >
          Admin
        </Button>
      )}
      {!user && (
        <>
          <Button
            component={Link}
            to="/login"
            color="secondary"
            variant="contained"
            sx={{ fontWeight: 600 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          >
            Register
          </Button>
        </>
      )}
      {user && (
        <Button
          onClick={handleLogout}
          color="secondary"
          variant="contained"
          sx={{ fontWeight: 600 }}
        >
          Logout
        </Button>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleMobileMenuClose}
      sx={{ mt: 1 }}
    >
      {user && (
        <>
          <MenuItem onClick={() => handleNavigate('/properties')}>
            <ApartmentIcon sx={{ mr: 1 }} /> Properties
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('/properties/add')}>
            <AddIcon sx={{ mr: 1 }} /> Add Property
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('/profile')}>
            <AccountCircleIcon sx={{ mr: 1 }} /> Profile
          </MenuItem>
        </>
      )}
      {user && user.role === 'proprietaire' && (
        <MenuItem onClick={() => handleNavigate('/admin')}>
          <AdminPanelSettingsIcon sx={{ mr: 1 }} /> Admin
        </MenuItem>
      )}
      {!user && (
        <>
          <MenuItem onClick={() => handleNavigate('/login')}>Login</MenuItem>
          <MenuItem onClick={() => handleNavigate('/register')}>Register</MenuItem>
        </>
      )}
      {user && (
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          Logout
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar position="fixed" color="primary" elevation={3}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 72 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HomeIcon sx={{ color: 'secondary.main' }} />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              color: 'secondary.main',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: 2
            }}
          >
            SaaS_IA
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              color="secondary"
              edge="end"
              onClick={handleMobileMenuOpen}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {renderMobileMenu()}
          </>
        ) : (
          renderDesktopMenu()
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 