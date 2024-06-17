import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post("https://freetestapi.com/api/v1/students", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("createdata", data);
    return response.data;
  } catch (error) {
    return rejectWithValue("Error creating user");
  }
});


export const showUser = createAsyncThunk("showUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://freetestapi.com/api/v1/students");
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk("deleteUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`https://freetestapi.com/api/v1/students/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://freetestapi.com/api/v1/students/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("updatedata", data);
    return response.data;
  } catch (error) {
    return rejectWithValue("Error updating user");
  }
});


const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {

        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload

        if (id) {
          state.users = state.users.filter((user) => user.id !== id);
        }

      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) => (ele.id === action.payload.id ? action.payload : ele))
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default userDetailSlice.reducer;
