// src/Sagas/Employee/userActions.js
import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './types';

export const addUser = (user) => ({ type: ADD_USER, payload: user });
export const updateUser = (user) => ({ type: UPDATE_USER, payload: user });
export const deleteUser = (id) => ({ type: DELETE_USER, payload: { id } });
export const fetchUsers = () => ({ type: FETCH_USERS });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });
export const fetchUsersSaga = () => ({ type: 'users/fetchUsers' });




