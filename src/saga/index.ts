import { call, put, takeEvery } from 'redux-saga/effects';
import {
  AddTodosPayload,
  DeleteTodosPayload,
  UpdateTodosPayload,
  Response,
} from 'types/todos';

import { SignInPayload, ActionToken } from 'types/user';

import {
  TodosLoadedTypes,
  AddTodoTypes,
  UpdateTodoTypes,
  DeleteTodoTypes,
  ClearIsDoneTodoTypes,
  UserSignIn,
  UpdateToken,
} from '../const/action_types';

import 'regenerator-runtime/runtime';
import ApiService from '../api';
const api = new ApiService();

import saveToken from '../utils/saveTouken';

//todos
function* getTask() {
  try {
    const response: Response = yield call(api.getAll);
    yield put({ type: TodosLoadedTypes.success, payload: response.data });
  } catch (error) {
    console.log(error);

    yield put({
      type: TodosLoadedTypes.failed,
      payload: { error },
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
    console.log('Err generator', error);

    yield put({
      type: AddTodoTypes.failed,
      payload: { error, oldPayload: payload },
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
      payload: { error, oldPayload: payload },
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
      payload: { error },
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
      payload: { error, oldPayload: payload },
    });
  }
}

//user
function* signIn({ payload }: SignInPayload) {
  try {
    const response: Response = yield call(api.signIn, payload);
    yield saveToken(response.tokens);
    yield put({ type: UserSignIn.success, payload: response });
  } catch (error) {
    console.log(error);
    yield put({
      type: UserSignIn.failed,
      payload: { error },
    });
  }
}

//update token
function* updateTokens({ payload }: ActionToken) {
  try {
    const response: Response = yield call(api.updateTokens, payload);
    yield saveToken(response.tokens);
  } catch (error) {
    yield put({
      type: UpdateToken.failed,
      payload: { error },
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

  //update token
  yield takeEvery(UpdateToken.request, updateTokens);
}
