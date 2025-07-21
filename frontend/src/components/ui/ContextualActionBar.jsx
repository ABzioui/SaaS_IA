import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import Button from './Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';

const ContextualActionBar = ({
  selectedItems = [],
  onAction,
  actions = ['edit', 'delete', 'archive'],
}) => {
  if (selectedItems.length === 0) return null;

  const getActionButton = (action) => {
    switch (action) {
      case 'edit':
        return (
          <Button
            key="edit"
            startIcon={<EditIcon />}
            onClick={() => onAction('edit')}
            variant="outlined"
            color="primary"
            sx={{ mr: 1 }}
          >
            Edit {selectedItems.length > 1 ? 'Items' : 'Item'}
          </Button>
        );
      case 'delete':
        return (
          <Button
            key="delete"
            startIcon={<DeleteIcon />}
            onClick={() => onAction('delete')}
            variant="outlined"
            color="error"
            sx={{ mr: 1 }}
          >
            Delete {selectedItems.length > 1 ? 'Items' : 'Item'}
          </Button>
        );
      case 'archive':
        return (
          <Button
            key="archive"
            startIcon={<ArchiveIcon />}
            onClick={() => onAction('archive')}
            variant="outlined"
            color="warning"
            sx={{ mr: 1 }}
          >
            Archive {selectedItems.length > 1 ? 'Items' : 'Item'}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'sticky',
        top: { xs: 56, sm: 64 },
        zIndex: 1100,
        p: 2,
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
        {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}{' '}
        selected
      </Typography>
      <Box>
        {actions.map((action) => getActionButton(action))}
      </Box>
    </Paper>
  );
};

export default ContextualActionBar; 