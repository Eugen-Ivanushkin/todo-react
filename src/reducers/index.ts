import { combineReducers } from 'redux';
import todosReducer from './todos';
import userReducer from './user';

const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

export default rootReducer;
