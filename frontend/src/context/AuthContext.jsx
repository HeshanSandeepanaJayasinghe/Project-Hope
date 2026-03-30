import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:8080';

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

  const logout = () => {
  setToken(null);
  };
  
  const handleResponseError = async (res) => {
    let body;
    try { body = await res.json(); } catch (e) { body = null; }
    const message = (body && (body.error || body.message)) || 'Request failed';
    const err = { response: { data: { message } } };
    throw err;
  };

  const value = {
    token,
    isAuthenticated: !!token,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
