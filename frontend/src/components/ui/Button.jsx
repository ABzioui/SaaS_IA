import React from 'react';
import { Button as MuiButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  disabled,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={endIcon}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button; 