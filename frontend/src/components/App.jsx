import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';
import Header from './Header';
import PrivateRoute from './ChatPrivateRoute';
import routes from '../routes.js';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
      <Route
        path={routes.mainPage()}
        element={(
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        )}
      />
      <Route path={routes.singInPage()} element={<SignInPage />} />
      <Route path={routes.signUpPage()} element={<SignUpPage />} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);

export default App;
