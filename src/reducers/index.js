const initialState = {
  todos: [],
  filter: 'ALL',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TODOS_LOADED':
      return { ...state, todos: action.payload };

    case 'ADD_TODOS_TASK': {
      const todos = state.todos.slice();
      todos.push(action.payload);

      return { ...state, todos };
    }

    case 'DELETE_TODOS_TASK': {
      const todos = state.todos.slice();
      const index = todos.findIndex((item) => item._id === action.payload);
      todos.splice(index, 1);

      return { ...state, todos };
    }

    case 'ISDONE_TODOS_TASK': {
      const todos = state.todos.slice();
      const index = todos.findIndex((item) => item._id === action.payload);
      const task = todos.splice(index, 1)[0];
      task.isDone = !task.isDone;
      todos.splice(index, 0, task);

      return { ...state, todos };
    }

    case 'UPDATE_TODOS_TASK': {
      const { id, newText } = action.payload;
      const todos = state.todos.slice();
      const index = todos.findIndex((item) => item._id === id);
      const task = todos.splice(index, 1)[0];
      task.text = newText;
      todos.splice(index, 0, task);

      return { ...state, todos };
    }

    case 'CLEAR_ISDONE_TODOS_TASKS': {
      const todos = state.todos.slice().filter((item) => item.isDone === false);

      return { ...state, todos };
    }

    case 'ALL': {
      return { ...state, filter: action.type };
    }

    case 'ACTIVE': {
      return { ...state, filter: action.type };
    }

    case 'COMPLETED': {
      return { ...state, filter: action.type };
    }

    default:
      return state;
  }
};

export default reducer;
