import React from 'react';
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" color="primary" fontWeight={700} mb={2}>
          Tableau de bord Propriétaire
        </Typography>
        {/* Content for the selected page will go here */}
      </Box>
    </Box>
  );
};

export default Dashboard; 