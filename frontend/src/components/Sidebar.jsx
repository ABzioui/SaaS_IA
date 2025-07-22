import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const menuItems = [
  { label: 'Biens Immobiliers', path: '#' },
  { label: 'Gestion des Locataires', path: '#' },
  { label: 'Demandes Locataires', path: '#' },
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 260, boxSizing: 'border-box', pt: 3 },
      }}
    >
      <Typography variant="h6" align="center" color="primary" fontWeight={700} mb={2}>
        Menu Propriétaire
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.label} component="a" href={item.path}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 