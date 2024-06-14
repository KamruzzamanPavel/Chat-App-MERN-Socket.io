import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get("http://localhost:5000/messages", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    list: [],
    status: "idle", // Adding status to track fetch status
    error: null, // Adding error to track fetch errors
  },
  reducers: {
    addMessage: (state, action) => {
      state.list.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.list = state.list.filter(
        (message) => message.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
