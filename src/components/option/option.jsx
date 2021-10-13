import React from "react";

import style from "./style.module.css";

export default class Option extends React.Component {
  render() {
    const { name } = this.props;
    return <button className={style.groupBtn}>{name}</button>;
  }
}
