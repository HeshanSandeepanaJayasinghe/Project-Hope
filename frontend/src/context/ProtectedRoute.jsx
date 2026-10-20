import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext.jsx';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isLoggedIn, user, sessionChecked } = useContext(AuthContext);
  const isAuthorized = isLoggedIn && (!allowedRoles.length || allowedRoles.includes(user));

  useEffect(() => {
    if (!sessionChecked) return;
    if (!isLoggedIn) {
      toast.error('You must be logged in to access this page.');
    } else if (!isAuthorized) {
      toast.error('You are not authorized to access this page.');
    }
  }, [sessionChecked, isLoggedIn, isAuthorized]);

  // Wait for the session check so a page refresh doesn't bounce logged-in users to /login.
  if (!sessionChecked) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
