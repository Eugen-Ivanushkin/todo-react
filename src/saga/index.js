import { call, put, takeEvery } from 'redux-saga/effects';

import 'regenerator-runtime/runtime';
import ApiService from '../api';
const api = new ApiService();

function* getTask() {
  try {
    const response = yield call(fetch, 'http://localhost:5000/todos');
    const data = yield call(() => new Promise((res) => res(response.json())));
    yield put({ type: 'TODOS_LOADED', payload: data.data });
  } catch (error) {
    console.log(error);
  }
}

export function* todosWatcher() {
  yield takeEvery('ASYNC_TODOS_LOADED', getTask);
}
