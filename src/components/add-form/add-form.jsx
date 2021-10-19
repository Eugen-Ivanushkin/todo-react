import React from "react";
import TodosContext from "../app/todos-context";

//style
import style from "./style.module.css";

//api;
import ApiService from "../../api";
const api = new ApiService();

export default class AddForm extends React.Component {
  state = {
    text: "",
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ text: value });
  };
  render() {
    return (
      <TodosContext.Consumer>
        {({ todosChange }) => (
          <input
            onChange={(e) => {
              this.onChange(e);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                api.addTask({ taskName: this.state.text }).then((data) => {
                  todosChange({ type: "ADD", payload: data.data });
                  e.target.value = "";
                });
              }
            }}
            className={style.add_input}
            placeholder="What is you done?"
          />
        )}
      </TodosContext.Consumer>
    );
  }
}
