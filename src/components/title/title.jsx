import React from "react";

//styles
import style from "./style.module.css";

export default class Title extends React.Component {
  render() {
    return <h1 className={style.h1}>{this.props.title}</h1>;
  }
}
