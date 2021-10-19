import React from "react";

import style from "./style.module.css";

export default class Option extends React.Component {
  handleOption = (e) => {
    const { handleOption } = this.props;
    handleOption(e);
  };

  render() {
    const { name } = this.props;
    return (
      <button onClick={this.handleOption} className={style.groupBtn}>
        {name}
      </button>
    );
  }
}
