import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  email: string;
  full_name: string;
  avatar: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userData: UserData | null;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userData: null,
  } as AuthState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action?.payload;
    },
    setUnAuthenticated: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { setAuthenticated, setUnAuthenticated } = authSlice.actions;
export default authSlice.reducer;
