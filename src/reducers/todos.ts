import { Option } from 'const/predicates';

export interface InitialState {
  todos: Array<Todo>;
  filter: Option;
}

export interface Todo {
  _id: string;
  text: string;
  isDone: boolean;
}

export const initialState: InitialState = {
  todos: [],
  filter: Option.ACTIVE,
};

interface Action {
  type: string;
  payload: string | Todo;
}

const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'TODOS_LOADED':
      return { ...state, todos: action.payload };

    case 'ADD_TODOS_TASK': {
      const todos = state.todos.slice();

      if (typeof action.payload !== 'string') {
        todos.push(action.payload);
      }

      return { ...state, todos };
    }

    case 'DELETE_TODOS_TASK': {
      const todos = state.todos.slice();
      const index = todos.findIndex((item) => item._id === action.payload);
      todos.splice(index, 1);

      return { ...state, todos };
    }

    case 'ISDONE_TODOS_TASK': {
      const todos = state.todos.map((todo) =>
        todo._id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );

      return { ...state, todos };
    }

    case 'UPDATE_TODOS_TASK': {
      const todos = state.todos.slice();

      if (typeof action.payload !== 'string') {
        const id: string = action.payload._id;
        const index = todos.findIndex((item) => item._id === id); // action payload._id - dont exist
        const task = todos.splice(index, 1)[0];
        task.text = action.payload.text;
        todos.splice(index, 0, task);
      }

      return { ...state, todos };
    }

    case 'CLEAR_ISDONE_TODOS_TASKS': {
      const todos = state.todos.slice().filter((item) => item.isDone === false);

      return { ...state, todos };
    }

    case 'ALL': {
      return { ...state, filter: Option.ALL };
    }

    case 'ACTIVE': {
      return { ...state, filter: Option.ACTIVE };
    }

    case 'COMPLETED': {
      return { ...state, filter: Option.COMPLETED };
    }

    default:
      return state;
  }
};

export default todosReducer;
