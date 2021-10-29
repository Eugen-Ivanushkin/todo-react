import { Option } from 'const/predicates';
import { InitialState } from 'types/todos';

interface State {
  todos: InitialState;
}

export const GetTodoList = (state: State) => state.todos.list;
export const GetFilter = (state: State): Option => state.todos.filter;
