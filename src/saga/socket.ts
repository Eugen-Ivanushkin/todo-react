import io, { Socket } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, ActionPattern } from 'redux-saga/effects';

import {
  AddTodoTypes,
  ClearIsDoneTodoTypes,
  UpdateTodoTypes,
} from 'const/action_types';

import { Todo } from 'types/todos';
import { Action } from 'redux';

type AddTodoSuccess = {
  type: typeof AddTodoTypes.success;
  payload: Todo;
};

type ClearIsDoneTodoSuccess = {
  type: typeof ClearIsDoneTodoTypes.success;
  payload: number;
};

function connect() {
  const socket = io('http://localhost:5000');
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket: Socket) {
  return eventChannel((emit) => {
    socket.on('TODO_ADDED', (task: Todo) => {
      console.log('Task:', task);
      return emit({ type: 'ADD_TODO_SOCKET', payload: task });
    });
    return () => {};
  });
}

function* read(socket: Socket) {
  const channel: ActionPattern<any> = yield call(subscribe, socket);
  while (true) {
    const action: Action = yield take(channel);
    yield put(action);
  }
}

type SuccessTodoTypes = AddTodoSuccess | ClearIsDoneTodoSuccess;

function* write(socket: Socket) {
  while (true) {
    const action: SuccessTodoTypes = yield take([
      AddTodoTypes.success,
      UpdateTodoTypes.success,
    ]);

    switch (action.type) {
      case AddTodoTypes.success: {
        socket.emit('ADD_TODO', action.payload);
        break;
      }
      case ClearIsDoneTodoTypes.success: {
        socket.emit('CLEAR_TODOS', action.payload && true);
        break;
      }
    }
  }
}

function* handleIO(socket: Socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

export default function* flow() {
  const socket: Socket = yield call(connect);
  yield fork(handleIO, socket);
}
