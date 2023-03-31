/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext } from 'react';
import localStorageTools from '../services/localStorageTools';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  console.log(children, 'auth');
  const [signedIn, setSignIn] = useState(localStorageTools.hasUserId());

  const signIn = (data) => {
    localStorageTools.setUserId(data);
    setSignIn(true);
  };

  const signOut = () => {
    localStorageTools.removeUserId();
    setSignIn(false);
  };

  return (
    <AuthContext.Provider value={{
      signedIn, signIn, signOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
