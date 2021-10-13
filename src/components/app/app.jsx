import React from "react";

//components
import Title from "../title";
import AddForm from "../add-form";
import TodoList from "../todo-list";
import TodoOptions from "../todo-options";

//style
import style from "./style.module.css";

export default class App extends React.Component {
  render() {
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
