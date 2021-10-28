import { Option } from 'const/predicates';
import { initialState as state, InitialState } from '../reducers/todos';

interface State {
  list: InitialState;
}

export const GetTodoList = (state: State) => state.list.todos;
export const GetFilter = (state: State): Option => state.list.filter;
