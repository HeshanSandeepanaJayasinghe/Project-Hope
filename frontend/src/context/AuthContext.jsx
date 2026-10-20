import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// The session is an HttpOnly cookie set by the backend, so no script on this page (including
// injected ones) can read the token. withCredentials makes the browser send it cross-origin, and
// X-Requested-With is the header the backend requires on state-changing requests (CSRF defence).
const createApi = () => axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});

const publicApi = createApi();

// Mirrors whether a session is active, for the 401 interceptor (which lives outside React state).
let sessionActive = false;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    sessionActive = Boolean(user);
  }, [user]);

  // Restore the session on page load, and drop tokens stored by older versions of the app.
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    publicApi.get('/authenticate/session')
      .then((res) => setUser(res.data?.role || null))
      .catch(() => setUser(null))
      .finally(() => setSessionChecked(true));
  }, []);

  const clearSession = useCallback(() => {
    sessionActive = false;
    setUser(null);
  }, []);

  const logout = useCallback(async (message) => {
    try {
      await publicApi.post('/authenticate/logout');
    } catch {
      // The cookie is cleared server-side; if the call fails the session simply expires.
    }
    clearSession();
    if (message) toast.info(message);
    navigate('/login');
  }, [clearSession, navigate]);

  // One stable instance, so effects that depend on it don't re-run on every render.
  const authAxios = useMemo(() => {
    const instance = createApi();

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && sessionActive) {
          clearSession();
          toast.error('Your session has expired. Please log in again.');
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [clearSession, navigate]);

  const login = async (email, password) => {
    const res = await publicApi.post('/authenticate/login', { email, password });
    const { role } = res.data;
    sessionActive = true;
    setUser(role);
    return { role };
  };

  const register = async (userData) => {
    const { userType, ...payload } = userData;
    const role = userType === 'donor' ? 'donor' : 'recipient';
    return publicApi.post(`/authenticate/register/${role}`, payload);
  };

  const value = {
    user,
    isLoggedIn: Boolean(user),
    sessionChecked,
    authAxios,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};
