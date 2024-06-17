
// Sagas/sagas.js
import { all } from 'redux-saga/effects';
import { rootSaga as userSaga } from './User/userSagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
  ]);
}
