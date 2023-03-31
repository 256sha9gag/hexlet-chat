/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelSlice';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: {
    currentChannelId: '',
  },
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.removeChannel, (state, { payload }) => {
        if (state.currentChannelId === payload) {
          state.currentChannelId = 1;
        }
      });
  },
});

export const { actions } = currentChannelIdSlice;
export default currentChannelIdSlice.reducer;
