import React from "react";

import "regenerator-runtime/runtime";

//components
import Title from "../title";
import AddForm from "../add-form";
import TodoList from "../todo-list";
import TodoOptions from "../todo-options";

//style
import style from "./style.module.css";

api;
import ApiService from "../../api";
const api = new ApiService();

export default class App extends React.Component {
  render() {
    api.getAll().then((data) => {
      console.log(data);
    });
    return (
      <div className={style.todos}>
        <Title title="Todos" />
        <div className={style.main}>
          <AddForm />
          <TodoList />
          <TodoOptions option={["All", "Active", "Complited", "ClearAll"]} />
        </div>
      </div>
    );
  }
}
