import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}));

const Select = ({
  label,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder,
  description,
  fullWidth = true,
  size = 'medium',
  ...props
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <StyledFormControl error={Boolean(error)} variant="outlined" fullWidth={fullWidth}>
      <InputLabel required={required}>{label}</InputLabel>
      <MuiSelect
        value={value || ''}
        onChange={handleChange}
        label={label}
        disabled={disabled}
        size={size}
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {(error || description) && (
        <FormHelperText error={Boolean(error)}>
          {error || description}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default Select; 