import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => localStorage.getItem('role'));

  const authAxios = axios.create({
    baseURL: BACKEND_URL,
  });

  authAxios.interceptors.request.use(config => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/authenticate/login`, {
        email,
        password,
      });

      const { Token, Role } = res.data;

      localStorage.setItem('token', Token);
      localStorage.setItem('role', Role);
      setToken(Token);
      setUser(Role);
      return { Token, Role };
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    const { userType, ...payload } = userData;
    const role = userType || 'recipient';
    const endpoint = `${BACKEND_URL}/authenticate/register/${role}`;

    try {
      const res = await axios.post(endpoint, payload);
      return res;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('role', user);
    } else {
      localStorage.removeItem('role');
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    authAxios,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};
