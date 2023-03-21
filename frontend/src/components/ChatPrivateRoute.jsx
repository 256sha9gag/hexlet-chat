import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.signedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
