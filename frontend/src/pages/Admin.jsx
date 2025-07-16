import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Admin = () => {
  const { token, user } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminMessage = async () => {
      try {
        const res = await fetch('/api/auth/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw data;
        setMessage(data.message);
      } catch (err) {
        setError(err.message || 'Failed to fetch admin message');
      }
    };
    if (token && user?.role === 'proprietaire') {
      fetchAdminMessage();
    }
  }, [token, user]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
        <Typography variant="h4" color="primary" fontWeight={700} mb={2} align="center">
          Admin Page
        </Typography>
        <Typography variant="h6" mb={1} align="center">
          Welcome, {user?.firstName} {user?.lastName} ({user?.email})
        </Typography>
        <Typography variant="body1" mb={2} align="center">
          <strong>Role:</strong> {user?.role}
        </Typography>
        <Box className="admin-message" sx={{ mb: 2, textAlign: 'center' }}>
          {error ? <span style={{ color: '#d32f2f', fontWeight: 500 }}>{error}</span> : message}
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          This page is only accessible to users with the <b>proprietaire</b> role.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Admin; 