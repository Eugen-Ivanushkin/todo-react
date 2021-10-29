import {
  AddTodoTypes,
  ClearIsDoneTodoTypes,
  DeleteTodoTypes,
  TodosLoadedTypes,
  UpdateTodoTypes,
} from 'const/action_types';
import { Option } from 'const/predicates';

import { InitialState, Action } from 'types/todos';

export const initialState: InitialState = {
  list: [],
  filter: Option.ACTIVE,
};

const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case TodosLoadedTypes.success:
      console.log(action.payload);
      return { ...state, list: action.payload };

    case AddTodoTypes.success: {
      const list = state.list.slice();

      list.push(action.payload);

      return { ...state, list };
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

    default:
      return state;
  }
};

export default todosReducer;
