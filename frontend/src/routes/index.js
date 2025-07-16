import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Page imports (to be implemented)
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import Home from '../pages/Home';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route element={<ProtectedRoute requiredRole="proprietaire" />}>
      <Route path="/admin" element={<Admin />} />
    </Route>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default AppRoutes; 