// // // src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, contact: null, token: null },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.contact = null;
    },
    addContact: (state, action) => {
      state.contact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("someAsyncThunk/pending", (state) => {
        state.status = "loading";
      })
      .addCase("someAsyncThunk/fulfilled", (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase("someAsyncThunk/rejected", (state) => {
        state.status = "failed";
      });
  },
});

export const { loginSuccess, logout, addContact } = authSlice.actions;
export default authSlice.reducer;
