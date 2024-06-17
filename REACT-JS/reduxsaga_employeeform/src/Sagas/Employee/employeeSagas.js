import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUsersFailure, fetchUsersSuccess,FETCH_USERS} from '../../Slices/user/employeeSlices';
import { fetchUsersApi } from '../../helpers/api'; // Import the API function

export function* fetchUsersSaga() {
    try {
      const response = yield fetch('https://jsonplaceholder.typicode.com/users');
      const data = yield response.json();
      yield put(fetchUsersSuccess(data));
    } catch (error) {
      yield put(fetchUsersFailure(error.message));
    }
  }
  export function* rootSaga() {
    yield takeLatest(FETCH_USERS, fetchUsersSaga);
  }
  export function* watchFetchUsers() {
    yield takeLatest('users/fetchUsers', fetchUsersSaga);
  }

// Add other sagas as needed
