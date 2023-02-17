import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  close: false,
  load: false,
  post: false,
  update: false,
  updateSuccess: false,
  like: false,
  comment: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    isOpen: (state, action) => {
      state.open = action.payload.opening;
      // state.post = state.post === true ? false : true;
      // console.log({ ...state });
    },
    isClose: (state, action) => {
      state.open = state.open === true ? false : true;
      // console.log({ ...state });
    },
    isLoad: (state, action) => {
      state.load = action.payload.isLoading;
      // console.log("====load", { ...state });
    },
    isPost: (state, action) => {
      state.post = action.payload.isPosted;
      // console.log("====post", { ...state });
    },
    isOpenUpdate: (state, action) => {
      state.update = action.payload.isOpenForm;
      // console.log("====update", { ...state });
    },
    isUpdateSuccess: (state, action) => {
      state.updateSuccess = action.payload.isSuccess;
      // console.log("====updateSuccess", { ...state });
    },
    isLike: (state, action) => {
      // state.mode = state.mode === "light" ? "dark" : "light";
      state.like = state.like === false ? true : false;
      // console.log("===state.like", state.like);
    },
    isComment: (state, action) => {
      state.comment = state.comment === false ? true : false;
      // console.log("===state.comment", state.comment);
    },
  },
});

export const {
  isClose,
  isOpen,
  isLoad,
  isPost,
  isOpenUpdate,
  isUpdateSuccess,
  isLike,
  isComment,
} = formSlice.actions;
export default formSlice.reducer;
