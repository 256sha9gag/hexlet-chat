// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './slice/channelSlice';
import currentChannelIdReducer from './slice/currentChannelIdSlice';
import messagesReducer from './slice/messagesSlice';
import messagesCountReducer from './slice/messagesCountSlice';

const store = configureStore({
  reducer: {
    channelsReducer, currentChannelIdReducer, messagesReducer, messagesCountReducer,
  },
});

export default store;
