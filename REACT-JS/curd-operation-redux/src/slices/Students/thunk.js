import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserApi,
  getUsersApi,
  deleteUserApi,
  updateUserApi,
} from '../../helpers/api_helper';

export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
  try {
    const response = await createUserApi(data);
    return response;
  } catch (error) {
    return rejectWithValue('Error creating user');
  }
});

export const showUser = createAsyncThunk('showUser', async (_, { rejectWithValue }) => {
  try {
    const response = await getUsersApi();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk('deleteUser', async (userId, { rejectWithValue }) => {
  try {
    const response = await deleteUserApi(userId);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk('updateUser', async (data, { rejectWithValue }) => {
  try {
    const { id, ...otherData } = data;
    console.log('ID in updateUser thunk:', id);
    const response = await updateUserApi(id, otherData);

    return response;
  } catch (error) {
    return rejectWithValue('Error updating user');
  }
});

