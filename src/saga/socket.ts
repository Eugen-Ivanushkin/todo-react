import io, { Socket } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, ActionPattern } from 'redux-saga/effects';

import {
  AddTodoTypes,
  ClearIsDoneTodoTypes,
  DeleteTodoTypes,
  SortTodos,
  UpdateTodoTypes,
} from 'const/action_types';

import { Todo } from 'types/todos';
import { Action } from 'redux';

//@ts-ignore
const storage = JSON.parse(sessionStorage.getItem('tokenData'));

type AddTodoSuccess = {
  type: typeof AddTodoTypes.success;
  payload: Todo;
};

type ClearIsDoneTodoSuccess = {
  type: typeof ClearIsDoneTodoTypes.success;
  payload: number;
};

function connect() {
  const socket = io('http://localhost:5000', {
    auth: {
      token: storage.accessToken,
    },
  });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket: Socket) {
  return eventChannel((emit) => {
    socket.on('TODO_ADDED', (task: Todo) => {
      return emit({ type: AddTodoTypes.socket, payload: task });
    });
    socket.on('TODO_UPDATED', (task: Todo) => {
      return emit({ type: UpdateTodoTypes.socket, payload: task });
    });
    socket.on('TODO_DELETED', (task: Todo) => {
      return emit({ type: DeleteTodoTypes.socket, payload: task });
    });
    socket.on('TODO_CLEARED', (task: Todo) => {
      return emit({ type: ClearIsDoneTodoTypes.socket, payload: task });
    });
    socket.on('TODOS_SORTED', (index) => {
      return emit({ type: SortTodos.socket, payload: index });
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
      ClearIsDoneTodoTypes.success,
      DeleteTodoTypes.success,
      SortTodos.success,
    ]);

    switch (action.type) {
      case AddTodoTypes.success: {
        socket.emit('ADD_TODO', action.payload, storage.accessToken);
        break;
      }
      case UpdateTodoTypes.success: {
        socket.emit('UPDATE_TODO', action.payload, storage.accessToken);
        break;
      }
      case DeleteTodoTypes.success: {
        socket.emit('DELETE_TODO', action.payload, storage.accessToken);
        break;
      }
      case ClearIsDoneTodoTypes.success: {
        socket.emit('CLEAR_TODOS', action.payload, storage.accessToken);
        break;
      }
      case SortTodos.success: {
        socket.emit('SORT_TODOS', action.payload, storage.accessToken);
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
