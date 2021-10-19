import React from "react";

import style from "./style.module.css";

export default class Option extends React.Component {
  render() {
    const { sortTodosChange, name } = this.props;
    return (
      <button
        onClick={() => sortTodosChange("COMPLITED")}
        className={style.groupBtn}
      >
        {name}
      </button>
    );
  }
}
