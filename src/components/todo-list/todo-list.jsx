import React from "react";

//components
import TodoListItem from "../todo-list-item";

//styles
import style from "./style.module.css";

export default class TodoList extends React.Component {
  render() {
    const { todos } = this.props;
    return (
      <ul className={style.todoList}>
        {todos.map((el) => (
          <TodoListItem key={el._id} id={el._id} text={el.text} />
        ))}
      </ul>
    );
  }
}
