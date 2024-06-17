// helpers/api/api_helper.js
import { api } from './api';

export const getchUsers = async () => {
  try {
    const response = await api.get('/users');
    console.log('Create User API Response:', response);
    return response.data;

  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

export const createUser = async ({ id, name, email }) => {
  try {
    const response = await api.post('/users', { id, name, email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async ({ id, name, email }) => {
  try {
    const response = await api.put(`/users/${id}`, { name, email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


