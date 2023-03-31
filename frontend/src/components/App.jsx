import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';
import Navbar from './Navbar';
import PrivateRoute from './ChatPrivateRoute';
import routes from '../routes.js';

const App = () => (
  <BrowserRouter>
    <Navbar />
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
  </BrowserRouter>
);

export default App;
