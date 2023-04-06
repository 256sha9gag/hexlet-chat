// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './slice/channelSlice';
import messagesReducer from './slice/messagesSlice';
import modalReducer from './slice/modalSlice';

const store = configureStore({
  reducer: {
    channelsReducer, messagesReducer, modalReducer,
  },
});

export default store;
