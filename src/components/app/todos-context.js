import React from "react";

const TodosContext = React.createContext({
  todos: [],
  todosChange: () => {},
});

export default TodosContext;
