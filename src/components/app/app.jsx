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

      return { ...state, todos };
    });
  };

  state = {
    todos: [],
    todosChange: this.todosChange,
  };

  componentDidMount() {
    api.getAll().then((data) => {
      this.setState({ todos: data.data });
      console.log(this.state.todos);
    });
  }
  render() {
    return (
      <TodosContext.Provider value={this.state}>
        <div className={style.todos}>
          <Title title="Todos" />
          <div className={style.main}>
            <AddForm />
            <TodoList todos={this.state.todos} />
            <TodoOptions option={["All", "Active", "Complited", "ClearAll"]} />
          </div>
        </div>
      </TodosContext.Provider>
    );
  }
}
