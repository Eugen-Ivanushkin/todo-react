import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import errorMiddleWare from 'middleWere';
import { rootWatcher } from 'saga/root';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, errorMiddleWare)
);

export default store;

sagaMiddleware.run(rootWatcher);
