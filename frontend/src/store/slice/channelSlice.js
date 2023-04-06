/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: (state, action) => {
      channelsAdapter.addOne(state, action);
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state, action);
      const { payload } = action;
      if (state.currentChannelId === payload) {
        state.currentChannelId = 1;
      }
    },
    updateChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
