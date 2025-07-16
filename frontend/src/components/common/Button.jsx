import React from 'react';
import MuiButton from '@mui/material/Button';

const Button = ({ children, onClick, type = 'button', disabled, className = '', color = 'primary', variant = 'contained', ...props }) => (
  <MuiButton
    type={type}
    onClick={onClick}
    disabled={disabled}
    color={color}
    variant={variant}
    className={className}
    sx={{ fontWeight: 600, borderRadius: 2, boxShadow: '0 2px 8px rgba(26,35,126,0.08)' }}
    {...props}
  >
    {children}
  </MuiButton>
);

export default Button; 