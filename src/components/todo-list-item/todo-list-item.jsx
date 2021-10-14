import React from "react";
import TodosContext from "../app/todos-context";

//style
import style from "./style.module.css";

//api
import ApiService from "../../api";
const api = new ApiService();

export default class TodoListItem extends React.Component {
  render() {
    const { id, text } = this.props;
    return (
      <TodosContext.Consumer>
        {({ todos, todosChange }) => (
          <li className={style.listItem} key={id} id={id}>
            <p className={style.listItemText}>{text}</p>
            <button
              onClick={(e) => {
                const { id } = e.target.parentElement;
                try {
                  api.deleteTask(id).then((data) => {
                    todosChange({ type: "DELETE", payload: id });
                  });
                } catch (e) {
                  console.log(e.message);
                }
              }}
              className={style.listItemBtn}
            >
              x
            </button>
          </li>
        )}
      </TodosContext.Consumer>
    );
  }
}
