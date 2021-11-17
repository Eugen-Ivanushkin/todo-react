import store from 'store';
import { UpdateToken } from 'const/action_types';
import { eventChannel } from '@redux-saga/core';
import { Todo } from 'types/todos';

import { io } from 'socket.io-client';

const errorMiddleWare =
  () => (next: any) => (action: { payload: any; type: string }) => {
    const actionType = action.type.split('_');
    actionType.pop();
    const requestType = actionType.join('_') + '_REQUEST';

    if (
      action.payload?.error &&
      action.payload.error.message === 'Invalid token!'
    ) {
      store.dispatch({
        type: UpdateToken.request,
        payload: true,
      });
      store.dispatch({
        type: requestType,
        payload: action.payload?.oldPayload,
      });
    }

    return next(action);
  };

export default errorMiddleWare;

// const initWebSocket = () => {
//   return eventChannel((emiter) => {
//     const ws = io('http://localhost:5000');

//     ws.on('connect', () => {
//       console.log('Connected to server');
//     });

//     ws.on('TODO_ADDED', (task: Todo) => {
//       console.log('Task:', task);
//     });
//   });
// };
