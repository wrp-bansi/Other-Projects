import { put, takeLatest } from "redux-saga/effects";
import {
  featchTodoPending,
  featchTodoFulfilled,
  featchTodoRejected,
} from "../slice/FeatchDataSlice";

function* fetchTodoSaga() {
  try {
    const response = yield fetch("https://jsonplaceholder.typicode.com/todos");
    const data = yield response.json();
    yield put(featchTodoFulfilled(data));
  } catch (error) {
    yield put(featchTodoRejected());
  }
}

export function* rootSaga() {
  yield takeLatest(featchTodoPending.type, fetchTodoSaga);
}
