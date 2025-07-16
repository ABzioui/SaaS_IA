import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ type = 'text', name, value, onChange, placeholder, required, disabled, className = '', ...props }) => (
  <TextField
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    disabled={disabled}
    className={className}
    fullWidth
    margin="normal"
    variant="outlined"
    sx={{ borderRadius: 2 }}
    {...props}
  />
);

export default Input; 