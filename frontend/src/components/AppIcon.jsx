import React from 'react';
import * as Icons from '@mui/icons-material';

const AppIcon = ({ name, size = 24, color, className, ...props }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      sx={{
        width: size,
        height: size,
        color: color,
      }}
      className={className}
      {...props}
    />
  );
};

export default AppIcon;