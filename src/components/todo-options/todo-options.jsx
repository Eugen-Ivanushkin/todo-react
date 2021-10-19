import React from "react";

//components
import Option from "../option";

//style
import style from "./style.module.css";

export default class TodoOptions extends React.Component {
  render() {
    const { sortTodosChange, option } = this.props;
    return (
      <div className={style.todoOptions}>
        {option.map((item) => (
          <Option sortTodosChange={sortTodosChange} key={item} name={item} />
        ))}
      </div>
    );
  }
}
