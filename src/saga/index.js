import { call, put, takeEvery } from 'redux-saga/effects';

import 'regenerator-runtime/runtime';
import ApiService from '../api';
const api = new ApiService();

function* getTask() {
  try {
    const response = yield call(api.getAll);
    yield put({ type: 'TODOS_LOADED', payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* addTask({ payload }) {
  try {
    const response = yield call(api.addTask, { taskName: payload });
    yield put({ type: 'ADD_TODOS_TASK', payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* deleteTask({ payload }) {
  try {
    yield call(api.deleteTask, payload);
    yield put({ type: 'DELETE_TODOS_TASK', payload });
  } catch (error) {
    console.log(error);
  }
}

function* deleteAllComplited() {
  try {
    yield call(api.deleteAllComplited);
    yield put({ type: 'CLEAR_ISDONE_TODOS_TASKS' });
  } catch (error) {
    console.log(error);
  }
}

function* updateIsDoneTask(action) {
  const { task, id } = action.payload;

  try {
    yield call(api.updateTask, task);
    yield put({ type: 'ISDONE_TODOS_TASK', payload: id });
  } catch (error) {
    console.log(error);
  }
}

function* updateTextTask(action) {
  const { task, id, newText } = action.payload;

  try {
    yield call(api.updateTask, task);
    yield put({ type: 'UPDATE_TODOS_TASK', payload: task });
  } catch (error) {
    console.log(error);
  }
}

export function* todosWatcher() {
  yield takeEvery('ASYNC_TODOS_LOADED', getTask);
  yield takeEvery('ASYNC_ADD_TODOS_TASK', addTask);
  yield takeEvery('ASYNC_DELETE_TODOS_TASK', deleteTask);
  yield takeEvery('ASYNC_CLEAR_ISDONE_TODOS_TASKS', deleteAllComplited);
  yield takeEvery('ASYNC_ISDONE_TODOS_TASK', updateIsDoneTask);
  yield takeEvery('ASYNC_UPDATE_TODOS_TASK', updateTextTask);
}
