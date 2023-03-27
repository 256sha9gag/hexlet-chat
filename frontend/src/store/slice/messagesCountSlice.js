import { createSlice } from '@reduxjs/toolkit';

const messagesCountSlice = createSlice({
  name: 'messagesCount',
  initialState: {
    messagesCount: 0,
  },
  reducers: {
    setMessagesCount: (state, { payload }) => {
      // eslint-disable-next-line functional/no-expression-statements, no-param-reassign
      state.messagesCount = payload;
    },
  },
});

export const { actions } = messagesCountSlice;
export default messagesCountSlice.reducer;
