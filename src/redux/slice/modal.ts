import { createSlice } from "@reduxjs/toolkit";

export const modal = createSlice({
  name: "modal",
  initialState: {
    modalType: "",
    open: false,
    edit: false,
    callback: null,
    data: null,
    MODAL_WIDTH: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload.modalType;
      state.open = true;
      state.edit = action.payload.edit;
      state.callback = action.payload.callback;
      state.data = action.payload.data;
      state.MODAL_WIDTH = action.payload.MODAL_WIDTH || "max-w-[450px]";
    },
    closeModal: (state) => {
      state.modalType = "";
      state.open = false;
      state.edit = false;
      state.callback = null;
      state.data = null;
      state.MODAL_WIDTH = "";
    },
  },
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;
