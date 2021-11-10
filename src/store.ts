import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import { todosWatcher } from './saga';
import { UpdateToken } from 'const/action_types';

const sagaMiddleware = createSagaMiddleware();

const errorMiddleWare =
  () => (next: any) => (action: { payload: any; type: string }) => {
    const actionType = action.type.split('_');
    actionType.pop();
    const successType = actionType.join('_') + '_REQUEST';

    if (
      action.payload?.error &&
      action.payload.error.message === 'Invalid token!'
    ) {
      store.dispatch({
        type: UpdateToken.request,
        payload: true,
      });
      store.dispatch({
        type: successType,
        payload: action.payload?.oldPayload,
      });
    }

    return next(action);
  };

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, errorMiddleWare)
);

export default store;

sagaMiddleware.run(todosWatcher);
