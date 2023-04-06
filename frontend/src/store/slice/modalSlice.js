/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalActionsSlice = createSlice({
  name: 'modalActions',
  initialState: {
    modalAction: null,
    isOpen: false,
    id: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { modalAction, id } = payload;
      state.modalAction = modalAction;
      state.isOpen = true;
      state.id = id;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { actions } = modalActionsSlice;
export default modalActionsSlice.reducer;
