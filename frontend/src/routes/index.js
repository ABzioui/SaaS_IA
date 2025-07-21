import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Auth pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Core pages
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

// Property pages
import PropertiesDashboard from '../pages/properties-dashboard';
import AddProperty from '../pages/add-property';
import EditProperty from '../pages/edit-property';
import PropertyDetails from '../pages/property-details';

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/" element={<Home />} />

    {/* Protected routes */}
    {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/profile" element={<Profile />} />
      
      {/* Property management routes */}
      <Route path="/properties" element={<PropertiesDashboard />} />
      <Route path="/properties/add" element={<AddProperty />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/properties/:id/edit" element={<EditProperty />} />
    {/* </Route> */}

    {/* Admin routes */}
    <Route element={<ProtectedRoute requiredRole="proprietaire" />}>
      <Route path="/admin" element={<Admin />} />
    </Route>

    {/* 404 route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes; 