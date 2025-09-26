// @ts-nocheck

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setUnAuthenticated: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, setUnAuthenticated } = authSlice.actions;
export default authSlice.reducer;
