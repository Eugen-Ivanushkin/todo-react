import React from "react";

//style
import style from "./style.module.css";

export default class TodoListItem extends React.Component {
  render() {
    const { id, taskName } = this.props;
    return (
      <li className={style.listItem} key={id}>
        <p className={style.listItemText}>{taskName}</p>
        <button className={style.listItemBtn}>x</button>
      </li>
    );
  }
}
