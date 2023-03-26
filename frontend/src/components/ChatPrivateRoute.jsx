import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import useAuth from '../hooks/authContext';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.signedIn ? children : <Navigate to={routes.singInPage()} state={{ from: location }} />
  );
};

export default PrivateRoute;
