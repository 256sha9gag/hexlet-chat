/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';

const modalActionsSlice = createSlice({
  name: 'modalAction',
  initialState: {
    modalAction: 'disableShow',
    id: '',
  },
  reducers: {
    setModalAction: (state, { payload }) => {
      state.modalAction = payload;
    },
    setChannelId: (state, { payload }) => {
      state.id = payload;
    },
  },
});

export const { actions } = modalActionsSlice;
export default modalActionsSlice.reducer;