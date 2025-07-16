import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const ProfileForm = ({ initialValues, onSubmit, loading, error }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    if (initialValues) {
      setForm({
        firstName: initialValues.firstName || '',
        lastName: initialValues.lastName || '',
        phone: initialValues.phone || '',
      });
    }
  }, [initialValues]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 4, maxWidth: 400, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="phone"
          label="Phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ fontWeight: 600, mt: 2 }}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
        {error && <Box sx={{ color: 'error.main', fontWeight: 500, mt: 1 }}>{error}</Box>}
      </Box>
    </Paper>
  );
};

export default ProfileForm; 