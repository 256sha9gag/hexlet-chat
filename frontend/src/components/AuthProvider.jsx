/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';
import localStorageTools from '../services/localStorageTools';

const AuthProvider = ({ children }) => {
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
