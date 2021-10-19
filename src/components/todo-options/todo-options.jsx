import React from "react";

//components
import Option from "../option";

//style
import style from "./style.module.css";

//api;
import ApiService from "../../api";
const api = new ApiService();

export default class TodoOptions extends React.Component {
  handleOption = (e) => {
    const { sortTodosChange } = this.props;
    api.deleteAllComplited().then((data) => {
      sortTodosChange(e.target.textContent.toUpperCase());
    });
  };

  render() {
    const { sortTodosChange, option } = this.props;
    return (
      <div className={style.todoOptions}>
        {option.map((item) => (
          <Option handleOption={this.handleOption} key={item} name={item} />
        ))}
      </div>
    );
  }
}
