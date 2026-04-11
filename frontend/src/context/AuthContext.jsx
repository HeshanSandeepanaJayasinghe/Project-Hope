import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => localStorage.getItem('role'));
  const [email, setEmail] = useState(() => localStorage.getItem('userEmail'));
  const [userProfile, setUserProfile] = useState(null);

  const authAxios = axios.create({
    baseURL: BACKEND_URL,
  });

  authAxios.interceptors.request.use(config => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  const fetchProfile = async (currentRole, currentEmail) => {
    if (!currentRole || !currentEmail || !token) return;
    try {
      const rolePath = currentRole.toLowerCase();
      //  Attempt to fetch profile details based on role and email from backend
      const response = await authAxios.get(`/${rolePath}/get/details/${currentEmail}`);
      setUserProfile(response.data);
    } catch (err) {
      console.error('Failed to fetch user profile, using mock fallback for demo:', err);

      //  Logic for mock demo data - used if the backend endpoints are missing
      if (currentRole.toLowerCase() === 'donor') {
        setUserProfile({
          name: currentEmail.split('@')[0].charAt(0).toUpperCase() + currentEmail.split('@')[0].slice(1),
          email: currentEmail,
          nic: 'XXXXXXXXXXV',
          occupation: 'Social Worker',
          organization: 'Hope Foundation'
        });
      }
    }
  };

  useEffect(() => {
    if (token && user && email) {
      fetchProfile(user, email);
    }
  }, [token, user, email]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/authenticate/login`, {
        email,
        password,
      });

      const { Token, Role } = res.data;

      localStorage.setItem('token', Token);
      localStorage.setItem('role', Role);
      localStorage.setItem('userEmail', email);
      setToken(Token);
      setUser(Role);
      setEmail(email);
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

  useEffect(() => {
    if (email) {
      localStorage.setItem('userEmail', email);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [email]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    setToken(null);
    setUser(null);
    setEmail(null);
    setUserProfile(null);
  };

  const value = {
    token,
    user,
    email,
    userProfile,
    authAxios,
    login,
    logout,
    register,
    fetchProfile
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};
