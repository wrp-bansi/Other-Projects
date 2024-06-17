// Sagas/Employee/sagas.js
import { takeLatest } from 'redux-saga/effects';
import { FETCH_USERS, fetchUsersSaga} from '../../Slices/user/employeeSlices';


export function* rootSaga() {
    yield takeLatest(FETCH_USERS, fetchUsersSaga);
  }
