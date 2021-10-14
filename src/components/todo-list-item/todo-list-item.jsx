import React from "react";

//style
import style from "./style.module.css";

export default class TodoListItem extends React.Component {
  render() {
    const { id, text } = this.props;
    return (
      <li className={style.listItem} key={id}>
        <p className={style.listItemText}>{text}</p>
        <button className={style.listItemBtn}>x</button>
      </li>
    );
  }
}
