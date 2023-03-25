/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable functional/no-expression-statements */
import React, { useState } from 'react';
import AuthContext from '../contexts/index';

const hasUserId = () => {
  const user = localStorage.getItem('userId');

  return !!(user);
};

const removeUserId = () => { localStorage.removeItem('userId'); };

const setUserId = (data) => { localStorage.setItem('userId', JSON.stringify(data)); };

const AuthProvider = ({ children }) => {
  const [signedIn, setSignIn] = useState(hasUserId());

  const signIn = (data) => {
    setUserId(data);
    setSignIn(true);
    localStorage.getItem('userId');
  };

  const signOut = () => {
    removeUserId();
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
