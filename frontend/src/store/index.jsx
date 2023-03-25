// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slice/channelSlice';

const store = configureStore({
  reducer: { channelsReducer },
});

export default store;
