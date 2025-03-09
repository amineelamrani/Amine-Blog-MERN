import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: {
    isloading: false,
    message: "",
  },
  error: { error: false, message: "" },
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startAddComment: (state) => {
      state.error = { error: false, message: "" };
      state.isLoading = {
        isloading: true,
        message: "Thanks for your comment! Adding it is in progress...",
      };
    },
    addCommentFailed: (state, action) => {
      state.error = { error: true, message: action.payload };
      state.isLoading = {
        isloading: false,
        message: "",
      };
    },
    addCommentSuccess: (state) => {
      state.error = { error: false, message: "" };
      state.isLoading = {
        isloading: false,
        message: "",
      };
    },
    startTyping: (state) => {
      state.isLoading = {
        isloading: false,
        message: "",
      };
    },
  },
});

export const {
  startAddComment,
  addCommentFailed,
  addCommentSuccess,
  startTyping,
} = commentSlice.actions;

export default commentSlice.reducer;
