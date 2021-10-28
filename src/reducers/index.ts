import { combineReducers } from 'redux';
import todosReducer from './todos';

const rootReducer: {} = combineReducers({
  list: todosReducer,
});

export default rootReducer;
