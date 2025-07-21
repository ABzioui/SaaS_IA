import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getPathName = (path) => {
    const formattedPath = path.replace(/-/g, ' ');
    return formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 3 }}
    >
      <MuiLink
        component={Link}
        to="/"
        color="inherit"
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </MuiLink>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography
            color="text.primary"
            key={to}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {getPathName(value)}
          </Typography>
        ) : (
          <MuiLink
            component={Link}
            to={to}
            key={to}
            color="inherit"
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {getPathName(value)}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNavigation; 