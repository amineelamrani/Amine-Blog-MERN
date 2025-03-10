import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: { error: false, message: "" },
  theme: "light",
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
    storeTheme: (state, action) => {
      state.theme = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = { error: false, message: "" };
    },
    StartChangeProfilePicture: (state) => {
      state.isLoading = true;
      state.error = { error: false, message: "" };
    },
    changeProfilePicture: (state, action) => {
      state.currentUser.profilePicture = action.payload;
      state.isLoading = false;
      state.error = { error: false, message: "" };
    },
    changeProfilePictureFail: (state) => {
      state.error = {
        error: true,
        message: "Failed to update profile picture",
      };
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
  storeTheme,
  signOut,
  changeProfilePicture,
  StartChangeProfilePicture,
  changeProfilePictureFail,
} = userSlice.actions;

export default userSlice.reducer;
