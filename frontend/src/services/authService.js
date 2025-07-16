const API_URL = 'http://localhost:5000/api/auth';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

const authService = {
  register: async (userData) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  refreshToken: async (refreshToken) => {
    const res = await fetch(`${API_URL}/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    return handleResponse(res);
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return handleResponse(res);
  },

  resetPassword: async (token, newPassword) => {
    const res = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    return handleResponse(res);
  },

  getProfile: async (token) => {
    const res = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return handleResponse(res);
  },

  updateProfile: async (token, profileData) => {
    const res = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(res);
  },
};

export default authService; 