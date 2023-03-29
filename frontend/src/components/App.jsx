import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';

import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import NotFoundPage from '../pages/NotFoundPage';
import NavBar from './Navbar';
import AuthProvider from './AuthProvider';
import SocketProvider from '../context/SocketProvider';
import PrivateRoute from './ChatPrivateRoute';
import store from '../store';
import routes from '../routes.js';

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <NavBar />
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
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  </Provider>
);

export default App;
