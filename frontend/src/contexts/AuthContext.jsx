import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authService.getProfile(token)
        .then(profile => setUser(profile))
        .catch(() => logout());
    }
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.token) {
      setToken(res.token);
      setRefreshToken(res.refreshToken);
      setUser(res.user);
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);
    }
    return res;
  };

  const register = async (data) => {
    const res = await authService.register(data);
    if (res.token) {
      setToken(res.token);
      setRefreshToken(res.refreshToken);
      setUser(res.user);
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  const refreshAuthToken = async () => {
    if (!refreshToken) return;
    const res = await authService.refreshToken(refreshToken);
    if (res.token) {
      setToken(res.token);
      localStorage.setItem('token', res.token);
    } else {
      logout();
    }
  };

  const getProfile = async () => {
    if (!token) return null;
    return await authService.getProfile(token);
  };

  const updateProfile = async (profileData) => {
    if (!token) return null;
    return await authService.updateProfile(token, profileData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        loading,
        login,
        register,
        logout,
        refreshAuthToken,
        getProfile,
        updateProfile,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
