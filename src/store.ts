import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import { todosWatcher } from './saga';

const sagaMiddleware = createSagaMiddleware();

const errorMiddleWare =
  () => (next: any) => (action: { payload: any; type: string }) => {
    // if (!action.payload) {
    console.log('action', action);
    // }

    return next(action);
  };

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, errorMiddleWare)
);

export default store;

sagaMiddleware.run(todosWatcher);
