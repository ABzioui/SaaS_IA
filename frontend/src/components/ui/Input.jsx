import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder,
  multiline = false,
  rows = 1,
  description,
  fullWidth = true,
  size = 'medium',
  ...props
}) => {
  return (
    <StyledFormControl error={Boolean(error)} variant="outlined">
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        fullWidth={fullWidth}
        size={size}
        {...props}
      />
      {(error || description) && (
        <FormHelperText error={Boolean(error)}>
          {error || description}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default Input; 