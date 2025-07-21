import React from 'react';
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  FormHelperText,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  disabled = false,
  description,
  ...props
}) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <StyledFormControl error={Boolean(error)}>
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />
        }
        label={label}
      />
      {(error || description) && (
        <FormHelperText error={Boolean(error)}>
          {error || description}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default Checkbox; 