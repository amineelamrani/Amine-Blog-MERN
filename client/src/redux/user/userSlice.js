import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: { error: false, message: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startAuth: (state) => {
      state.isLoading = true;
      state.error = { error: false, message: "" };
    },
    signInDone: (state, action) => {
      state.error = { error: false, message: "" };
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    signInFailed: (state, action) => {
      state.error = {
        error: true,
        message: action.payload,
      };
      state.isLoading = true;
    },
    startTyping: (state) => {
      state.isLoading = false;
    },
    createAccountSuccess: (state) => {
      state.error = { error: false, message: "" };
      state.isLoading = false;
    },
  },
});

export const {
  startAuth,
  signInDone,
  signInFailed,
  startTyping,
  createAccountSuccess,
} = userSlice.actions;

export default userSlice.reducer;
