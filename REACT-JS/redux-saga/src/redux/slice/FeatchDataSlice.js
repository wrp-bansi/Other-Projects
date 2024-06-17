import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  reducers: {
    featchTodoPending: (state) => {
      state.isLoading = true;
    },
    featchTodoFulfilled: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    featchTodoRejected: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  featchTodoPending,
  featchTodoFulfilled,
  featchTodoRejected,
} = todoSlice.actions;

export default todoSlice.reducer;
