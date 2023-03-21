import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import NotFound from '../pages/NotFound';
// import SignupPage from './components/Signup';
import NavBar from './Navbar';
import AuthProvider from './AuthProvider';
import PrivateRoute from './ChatPrivateRoute';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
        )}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
