import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext.jsx';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token, user } = useContext(AuthContext);
  const isLoggedIn = Boolean(token);
  const isAuthorized = isLoggedIn && (!allowedRoles.length || allowedRoles.includes(user));

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('You must be logged in to access this page.');
    } else if (!isAuthorized) {
      toast.error('You are not authorized to access this page.');
    }
  }, [isLoggedIn, isAuthorized]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;