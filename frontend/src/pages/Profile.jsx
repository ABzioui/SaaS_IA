import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import ProfileForm from '../components/ProfileForm';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Profile = () => {
  const { user, updateProfile, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!user) return <div>Loading...</div>;

  const handleEdit = () => {
    setEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await updateProfile(formData);
      setUser({ ...user, ...formData });
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
        <Typography variant="h4" color="primary" fontWeight={700} mb={2} align="center">
          My Profile
        </Typography>
        {!editing ? (
          <Box className="profile-info" sx={{ mb: 2 }}>
            <Typography variant="body1" mb={1}><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body1" mb={1}><strong>First Name:</strong> {user.firstName}</Typography>
            <Typography variant="body1" mb={1}><strong>Last Name:</strong> {user.lastName}</Typography>
            <Typography variant="body1" mb={1}><strong>Phone:</strong> {user.phone}</Typography>
            <Typography variant="body1" mb={2}><strong>Role:</strong> {user.role}</Typography>
            <Button onClick={handleEdit} variant="contained" color="secondary" sx={{ fontWeight: 600 }}>
              Edit Profile
            </Button>
          </Box>
        ) : (
          <ProfileForm
            initialValues={user}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
        {success && <Box sx={{ color: 'success.main', fontWeight: 500, mt: 2 }}>{success}</Box>}
      </Paper>
    </Container>
  );
};

export default Profile; 