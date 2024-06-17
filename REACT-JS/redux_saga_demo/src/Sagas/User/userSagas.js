// Sagas/Employee/employeeSagas.js
import { call, put, takeLatest, all } from 'redux-saga/effects';

import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
} from './types';
import {
  setError,
  setUsers,
} from '../../Slices/Users/userSlice';

import { getchUsers, createUser, updateUser, deleteUser } from '../../helpers/api_helper';
import { fetchUsers } from './userActions';

// Saga for fetching users
export function* fetchUsersSaga() {
  try {
    const users = yield call(getchUsers);
    yield put(setUsers(users));
  } catch (error) {
    yield put(setError(error.message));
  }
}

// Saga for adding a user
export function* addUserSaga(action) {
  try {
    const user = action.payload;
    yield call(createUser, user);
     console.log('User added successfully');
    // yield put(setUsers(yield call(fetchUsersApi))); // Refresh the user list after adding
    yield put(fetchUsers())
  } catch (error) {
    yield put(setError(error.message));
  }
}

// Saga for updating a user
export function* updateUserSaga(action) {
  try {
    const user = action.payload;
    yield call(updateUser, user);
    console.log('User updated successfully on the API');
    // yield put(setUsers(yield call(fetchUsersApi))); // Refresh the user list after updating
    yield put(fetchUsers())
  } catch (error) {
    yield put(setError(error.message));
  }
}

// Saga for deleting a user
export function* deleteUserSaga(action) {
  try {
    const { id } = action.payload;
    yield call(deleteUser, id);
    yield put(fetchUsers())
    console.log('User deleteed successfully on the API');
  } catch (error) {
    yield put(setError(error.message));
  }
}

// Watcher saga
export function* rootSaga() {
  yield all([
    takeLatest(FETCH_USERS, fetchUsersSaga),
    takeLatest(ADD_USER, addUserSaga),
    takeLatest(UPDATE_USER, updateUserSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
  ]);
}
