import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h3" color="primary" fontWeight={700} mb={2}>
          Welcome to SaaS_IA
        </Typography>
        {user ? (
          <Box>
            <Typography variant="h6" mb={1}>
              Hello, <b>{user.firstName} {user.lastName}</b>!
            </Typography>
            <Typography variant="body1" mb={1}>
              Your role: <b>{user.role}</b>
            </Typography>
            <Typography variant="body1" mb={2}>
              Email: {user.email}
            </Typography>
            <Button component={Link} to="/profile" variant="contained" color="secondary" sx={{ fontWeight: 600, mb: 1 }}>
              Go to Profile
            </Button>
            {user.role === 'proprietaire' && (
              <Button component={Link} to="/admin" variant="outlined" color="secondary" sx={{ fontWeight: 600, ml: 2 }}>
                Go to Admin Page
              </Button>
            )}
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" mb={2}>
              Please <Button component={Link} to="/login" color="secondary" sx={{ textTransform: 'none', fontWeight: 600 }}>Login</Button> or <Button component={Link} to="/register" color="secondary" sx={{ textTransform: 'none', fontWeight: 600 }}>Register</Button> to get started.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Home; 