import React from "react";

//style
import style from "./style.module.css";

export default class TodoListItem extends React.Component {
  state = {
    text: this.props.text,
  };

  theClick = (e) => {
    const { theClick, id } = this.props;
    if (e.target.id) {
      theClick(e, id);
    }
  };

  handleDeleteClick = () => {
    const { handleDeleteClick, id } = this.props;
    handleDeleteClick(id);
  };

  handleUpdateTextClick = () => {
    const { handleUpdateTextClick, id } = this.props;
    const { text } = this.state;
    handleUpdateTextClick(id, text);
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ text: value });
  };

  render() {
    const { id, text, isDone, inputChangeId } = this.props;
    return (
      <li className={style.listItem} key={id} id={id} onClick={this.theClick}>
        {inputChangeId !== id ? (
          <>
            <p
              className={`${style.listItemText} ${isDone ? style.isDone : ""}`}
            >
              {text}
            </p>
            <button
              onClick={this.handleDeleteClick}
              className={style.listItemBtn}
            >
              x
            </button>
          </>
        ) : (
          <input
            onChange={(e) => {
              this.onChange(e);
            }}
            value={this.state.text}
            onBlur={this.handleUpdateTextClick}
            className={style.updateInput}
            autoFocus
          />
        )}
      </li>
    );
  }
}
