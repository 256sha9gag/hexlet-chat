import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { actions as channelActions } from './channelSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.removeChannel, (state, { payload }) => {
        const currentMessages = Object.values(state.entities).filter((id) => id !== payload);
        messagesAdapter.setAll(state, currentMessages);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
