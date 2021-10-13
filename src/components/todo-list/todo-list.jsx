import React from "react";

//components
import TodoListItem from "../todo-list-item";

//styles
import style from "./style.module.css";

const someTodoArr = [
  {
    id: 1,
    taskName: "some task 1",
  },
  {
    id: 2,
    taskName: "some task 2",
  },
  {
    id: 3,
    taskName: "some task 3",
  },
];

export default class TodoList extends React.Component {
  render() {
    return (
      <ul className={style.todoList}>
        {someTodoArr.map((el) => (
          <TodoListItem key={el.id} id={el.id} taskName={el.taskName} />
        ))}
      </ul>
    );
  }
}
