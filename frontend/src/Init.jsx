/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App';
import SocketProvider from './context/SocketProvider';
import AuthProvider from './context/AuthProvider';
import resources from './locales/index';
import store from './store/index';

const Init = () => {
  const defaultLanguage = 'ru';
  const socket = io();

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLanguage,
    });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};

export default Init;
