import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NavigationHeader = ({
  title,
  subtitle,
  onBack,
  showBackButton = true,
  actions,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {showBackButton && (
          <IconButton
            onClick={handleBack}
            sx={{ mr: 2 }}
            aria-label="back"
            edge="start"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box>
          <Typography variant="h4" component="h1" gutterBottom={Boolean(subtitle)}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {actions && <Box>{actions}</Box>}
    </Box>
  );
};

export default NavigationHeader; 