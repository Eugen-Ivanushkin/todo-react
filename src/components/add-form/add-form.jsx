import React from "react";

//style
import style from "./style.module.css";

export default class AddForm extends React.Component {
  render() {
    return (
      <input className={style.add_input} placeholder="What is you done?" />
    );
  }
}
