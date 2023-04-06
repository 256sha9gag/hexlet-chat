import React, { useState, createContext, useMemo } from 'react';
import localStorageTools from '../services/localStorageTools';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [signedIn, setSignIn] = useState(localStorageTools.hasUserId());

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorageTools.getUser());
    return (userId && userId.token) ? { Authorization: `Bearer ${userId.token}` } : {};
  };

  const authValue = useMemo(() => ({
    signedIn,
    getAuthHeader,
    signIn: (data) => {
      localStorageTools.setUserId(data);
      setSignIn(true);
    },
    signOut: () => {
      localStorageTools.removeUserId();
      setSignIn(false);
    },
  }), [signedIn]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
