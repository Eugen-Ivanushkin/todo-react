import React from "react";

//components
import TodoListItem from "../todo-list-item";

//styles
import style from "./style.module.css";

//api;
import ApiService from "../../api";
const api = new ApiService();

export default class TodoList extends React.Component {
  state = {
    waitingForClick: false,
    inputChangeId: "",
  };

  theClick = (e, id, newText) => {
    switch (e.detail) {
      case 1: // first click
        this.state.waitingForClick = setTimeout(() => {
          this.handleIsDoneClick(id);
        }, 250);
        break;

      default:
        // more click
        if (this.state.waitingForClick) {
          // remove click
          clearTimeout(this.state.waitingForClick);
          this.state.waitingForClick = false;
          this.setState({
            ...this.state,
            waitingForClick: false,
            inputChangeId: id,
          });
        }
        break;
    }
  };

  handleIsDoneClick = (id) => {
    const { todosChange, todos } = this.props;

    const copyTodos = todos.slice();
    const index = copyTodos.findIndex((item) => item._id === id);
    const task = { ...copyTodos.splice(index, 1)[0] };
    task.isDone = !task.isDone;

    api.updateTask(task, id).then((data) => {
      todosChange({ type: "ISDONE", payload: id });
    });
  };

  handleUpdateTextClick = (id, newText) => {
    const { todosChange, todos } = this.props;

    const copyTodos = todos.slice();
    const index = copyTodos.findIndex((item) => item._id === id);
    const task = { ...copyTodos.splice(index, 1)[0] };
    task.text = newText;

    api.updateTask(task, id).then((data) => {
      todosChange({ type: "UPDATE", payload: { id, newText } });
    });

    this.setState({ ...this.state, inputChangeId: "" });
  };

  handleDeleteClick = (id) => {
    const { todosChange } = this.props;
    try {
      api.deleteTask(id).then((data) => {
        todosChange({ type: "DELETE", payload: id });
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { sortTodos } = this.props;
    return (
      <ul className={style.todoList}>
        {sortTodos.map((el) => (
          <TodoListItem
            key={el._id}
            id={el._id}
            text={el.text}
            inputChangeId={this.state.inputChangeId}
            isDone={el.isDone}
            theClick={this.theClick}
            handleIsDoneClick={this.handleIsDoneClick}
            handleDeleteClick={this.handleDeleteClick}
            handleUpdateTextClick={this.handleUpdateTextClick}
          />
        ))}
      </ul>
    );
  }
}