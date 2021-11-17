import {
  AddTodoTypes,
  ClearIsDoneTodoTypes,
  DeleteTodoTypes,
  SortTodos,
  TodosLoadedTypes,
  UpdateTodoTypes,
} from 'const/action_types';
import { Option } from 'const/predicates';

import { InitialState, Action, Todo } from 'types/todos';

import AddUpdateSortProperty from 'utils/updateSortProperty';

export const initialState: InitialState = {
  list: [],
  filter: Option.ACTIVE,
};

const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case TodosLoadedTypes.success:
      const list: Todo[] = action.payload.sort(
        (a: Todo, b: Todo) => Number(a.sort) - Number(b.sort)
      );
      return { ...state, list };

    case 'ADD_TODO_SOCKET':
    case AddTodoTypes.success: {
      const todo = action.payload;
      return {
        ...state,
        list: [...state.list, todo],
      };
    }
    case DeleteTodoTypes.success: {
      const list = state.list.filter((item) => item._id !== action.payload._id);

      return { ...state, list };
    }

    case UpdateTodoTypes.success: {
      const list = state.list.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );

      return { ...state, list };
    }

    case ClearIsDoneTodoTypes.success: {
      const list = state.list.filter((item) => item.isDone === false);

      return { ...state, list };
    }

    case Option.ALL: {
      return { ...state, filter: Option.ALL };
    }

    case Option.ACTIVE: {
      return { ...state, filter: Option.ACTIVE };
    }

    case Option.COMPLETED: {
      return { ...state, filter: Option.COMPLETED };
    }

    case SortTodos.success: {
      const { prevIdx, idx }: any = action.payload;

      const updateTodo: Todo = AddUpdateSortProperty(prevIdx, idx, state.list);

      let list = state.list.map((todo) =>
        todo._id === updateTodo._id ? updateTodo : todo
      );

      list = list.sort((a, b) => Number(a.sort) - Number(b.sort));

      return { ...state, list };
    }

    default:
      return state;
  }
};

export default todosReducer;
