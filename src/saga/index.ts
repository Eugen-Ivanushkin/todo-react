import { call, put, takeEvery } from 'redux-saga/effects';
import {
  AddTodosPayload,
  DeleteTodosPayload,
  UpdateTodosPayload,
  Response,
} from 'types/todos';

import { SignInPayload } from 'types/user';

import {
  TodosLoadedTypes,
  AddTodoTypes,
  UpdateTodoTypes,
  DeleteTodoTypes,
  ClearIsDoneTodoTypes,
  UserSignIn,
} from '../const/action_types';

import 'regenerator-runtime/runtime';
import ApiService from '../api';
const api = new ApiService();

//todos
function* getTask() {
  try {
    const response: Response = yield call(api.getAll);
    yield put({ type: TodosLoadedTypes.success, payload: response.data });
  } catch (error) {
    console.log(error);

    yield put({
      type: TodosLoadedTypes.failed,
      payload: error,
    });
  }
}

function* addTask({ payload }: AddTodosPayload) {
  try {
    const response: Response = yield call(api.addTask, {
      taskName: payload.text,
    });
    yield put({ type: AddTodoTypes.success, payload: response.data });
  } catch (error) {
    console.log(error);
    yield put({
      type: AddTodoTypes.failed,
      payload: error,
    });
  }
}

function* deleteTask({ payload }: DeleteTodosPayload) {
  try {
    yield call(api.deleteTask, payload._id);
    yield put({ type: DeleteTodoTypes.success, payload });
  } catch (error) {
    console.log(error);
    yield put({
      type: DeleteTodoTypes.failed,
      payload: error,
    });
  }
}

function* deleteAllComplited() {
  try {
    yield call(api.deleteAllComplited);
    yield put({ type: ClearIsDoneTodoTypes.success });
  } catch (error) {
    console.log(error);
    yield put({
      type: ClearIsDoneTodoTypes.failed,
      payload: error,
    });
  }
}

function* updateTask({ payload }: UpdateTodosPayload) {
  try {
    const response: Response = yield call(api.updateTask, payload);
    yield put({ type: UpdateTodoTypes.success, payload: response.data });
  } catch (error) {
    console.log(error);
    yield put({
      type: UpdateTodoTypes.failed,
      payload: error,
    });
  }
}

//user
function* signIn({ payload }: SignInPayload) {
  try {
    const response: Response = yield call(api.signIn, payload);
    yield put({ type: UserSignIn.success, payload: response });
  } catch (error) {
    console.log(error);
    yield put({
      type: UserSignIn.failed,
      payload: error,
    });
  }
}

export function* todosWatcher() {
  //todos
  yield takeEvery(TodosLoadedTypes.request, getTask);
  yield takeEvery(AddTodoTypes.request, addTask);
  yield takeEvery(DeleteTodoTypes.request, deleteTask);
  yield takeEvery(ClearIsDoneTodoTypes.request, deleteAllComplited);
  yield takeEvery(UpdateTodoTypes.request, updateTask);

  //user
  yield takeEvery(UserSignIn.request, signIn);
}
