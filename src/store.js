import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import { todosWatcher } from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(todosWatcher);
