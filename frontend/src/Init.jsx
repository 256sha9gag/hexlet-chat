import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

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

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketProvider socket={socket}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </SocketProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default Init;
