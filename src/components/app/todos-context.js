import React from "react";

const TodosContext = React.createContext({
  todos: [],
  sortTodos: [],
  todosChange: () => {},
});

export default TodosContext;
