import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import Navbar from './components/common/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
// Add Material UI imports
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Luxury theme example
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a237e', // Deep blue
    },
    secondary: {
      main: '#ffd700', // Gold
    },
    background: {
      default: '#f5f7fa', // Light luxury background
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <div className="main-content">
          <AppRoutes />
        </div>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
