import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const authAxios = axios.create({
    baseURL: BACKEND_URL,
  });

  authAxios.interceptors.request.use(config => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  });

   const login = async (email, password) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
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
    user,
    authAxios,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
