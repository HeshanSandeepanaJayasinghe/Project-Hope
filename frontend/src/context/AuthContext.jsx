import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleResponseError = async (res) => {
    let body;
    try { body = await res.json(); } catch (e) { body = null; }
    const message = (body && (body.error || body.message)) || 'Request failed';
    const err = { response: { data: { message } } };
    throw err;
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/authenticate/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) return handleResponseError(res);

      const data = await res.json();
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      // simple register endpoint used by the backend test controller
      const payload = {
        email: formData.email,
        password: formData.password
      };

      const res = await fetch('/authenticate/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) return handleResponseError(res);

      const data = await res.json().catch(() => ({}));
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
