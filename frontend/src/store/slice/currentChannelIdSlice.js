import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: {
    currentChannelId: '',
  },
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      // eslint-disable-next-line functional/no-expression-statements, no-param-reassign
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = currentChannelIdSlice;
export default currentChannelIdSlice.reducer;
