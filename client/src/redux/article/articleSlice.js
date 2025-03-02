import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: {
    isloading: false,
    message: "",
  },
  error: { error: false, message: "" },
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    startUploadArticle: (state, action) => {
      state.error = { error: false, message: "" };
      state.isLoading = {
        isloading: true,
        message: action.payload,
      };
    },
    createArticleFailed: (state, action) => {
      state.error = { error: true, message: action.payload };
      state.isLoading = {
        isloading: false,
        message: "",
      };
    },
    uploadsuccess: (state) => {
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
  startUploadArticle,
  createArticleFailed,
  uploadsuccess,
  startTyping,
} = articleSlice.actions;

export default articleSlice.reducer;
