import api from './api';

export const createUserApi = async (data) => {
  try {
    const response = await api.post('/students', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersApi = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserApi = async (userId) => {
  try {
    const response = await api.delete(`/students/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserApi = async (id, data) => {
  try {
    const response = await api.put(`/students/${id}`, data);
    console.log('Update API Response:', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
