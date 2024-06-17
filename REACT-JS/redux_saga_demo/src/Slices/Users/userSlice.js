// src/Slices/Employee/employeeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      const foundUser = state.data.find((user) => user.id === id);

      if (foundUser) {
        foundUser.name = name;
        foundUser.email = email;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.data = state.data.filter((user) => user.id !== id);
    },
    setUsers: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  setUsers,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
