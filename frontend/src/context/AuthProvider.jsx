import React, { useState, createContext, useMemo } from 'react';
import localStorageTools from '../services/localStorageTools';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [signedIn, setSignIn] = useState(localStorageTools.hasUserId());

  const authValue = useMemo(() => ({
    signedIn,
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
