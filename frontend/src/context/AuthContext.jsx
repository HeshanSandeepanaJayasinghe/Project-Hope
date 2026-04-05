import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();
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
      const res = await axios.post(`${BACKEND_URL}/authenticate/login`, {
        email,
        password,
      });

      const { Token, Role } = res.data;

      localStorage.setItem("token", token);
      setToken(Token);
      setUser(Role);
      return {Token, Role};
    } catch (err) {
      throw err;
    }
  };

const register = async (userData, role) => {
  const endpoint = `${BACKEND_URL}/authenticate/register/${role}`;

  try {
    const res = await axios.post(endpoint, userData);
    if (res.status === 200 || res.status === 201) {
      toast.success("Registration successful!");
      navigate("/login"); 
    }
  } catch (err) {
    toast.error("Registration failed:", err.response?.data || err.message);
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
