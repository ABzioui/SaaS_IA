import React from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = ({ type = 'info', children, ...props }) => (
  <MuiAlert severity={type} sx={{ borderRadius: 2, fontWeight: 500 }} {...props}>
    {children}
  </MuiAlert>
);

export default Alert; 