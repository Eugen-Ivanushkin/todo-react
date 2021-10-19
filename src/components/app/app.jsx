import React from "react";

import "regenerator-runtime/runtime";

//context
import TodosContext from "./todos-context";

//components
import Title from "../title";
import AddForm from "../add-form";
import TodoList from "../todo-list";
import TodoOptions from "../todo-options";

//style
import style from "./style.module.css";

//api;
import ApiService from "../../api";
const api = new ApiService();

export default class App extends React.Component {
  todosChange = (action) => {
    this.setState((state) => {
      const todos = state.todos.slice();
      if (action.type === "ADD") todos.push(action.payload);

      if (action.type === "DELETE") {
        const index = todos.findIndex((item) => item._id === action.payload);
        todos.splice(index, 1);
      }

      if (action.type === "ISDONE") {
        const index = todos.findIndex((item) => item._id === action.payload);
        const task = todos.splice(index, 1)[0];
        task.isDone = !task.isDone;
        todos.splice(index, 0, task);
      }

      if (action.type === "UPDATE") {
        const index = todos.findIndex((item) => item._id === action.payload.id);
        const task = todos.splice(index, 1)[0];
        task.text = action.payload.newText;
        todos.splice(index, 0, task);
      }

      return { ...state, todos, sortTodos: todos.slice() };
    });
  };

  sortTodosChange = (action) => {
    const { state } = this;
    const { todos } = this.state;
    let sortTodos = todos.slice();

    if (action === "ALL") {
      this.setState({ state, sortTodos });
    }

    if (action === "ACTIVE") {
      sortTodos = todos.filter((item) => item.isDone === false);
      this.setState({ ...state, sortTodos });
    }

    if (action === "COMPLITED") {
      sortTodos = todos.filter((item) => item.isDone === true);
      this.setState({ ...state, sortTodos });
    }

    if (action === "CLEARALL") {
      sortTodos = todos.filter((item) => item.isDone === false);
      this.setState({ ...state, todos: sortTodos, sortTodos });
    }
  };

  state = {
    todos: [],
    sortTodos: [],
    todosChange: this.todosChange,
  };

  componentDidMount() {
    api.getAll().then((data) => {
      this.setState({ todos: data.data, sortTodos: data.data });
    });
  }
  render() {
    const { todos, sortTodos } = this.state;
    return (
      <TodosContext.Provider value={this.state}>
        <div className={style.todos}>
          <Title title="Todos" />
          <div className={style.main}>
            <AddForm />
            <TodoList
              todos={todos}
              sortTodos={sortTodos}
              todosChange={this.todosChange}
            />
            <TodoOptions
              sortTodosChange={this.sortTodosChange}
              option={["All", "Active", "Complited", "ClearAll"]}
            />
          </div>
        </div>
      </TodosContext.Provider>
    );
  }
}
