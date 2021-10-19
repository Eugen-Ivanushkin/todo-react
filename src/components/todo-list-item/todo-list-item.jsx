import React from "react";

//style
import style from "./style.module.css";

export default class TodoListItem extends React.Component {
  state = {
    text: this.props.text,
    waitingForClick: false,
    isEdit: false,
  };

  handleClick = (e) => {
    if (e.target.id === "delBtn") {
      return;
    }

    const { id, handleIsDoneClick } = this.props;

    switch (e.detail) {
      case 1: // first click
        this.state.waitingForClick = setTimeout(() => {
          console.log("One click");
          handleIsDoneClick(id);
        }, 250);
        break;

      default:
        // more click
        if (this.state.waitingForClick) {
          // remove click
          clearTimeout(this.state.waitingForClick);
          this.setState({
            ...this.state,
            isEdit: true,
            waitingForClick: false,
          });
        }
        break;
    }
  };

  handleDeleteClick = () => {
    const { handleDeleteClick: handleDeleteClickProps, id } = this.props;
    handleDeleteClickProps(id);
  };

  handleUpdateTextClick = () => {
    const { handleUpdateTextClick: handleUpdateTextClickProps, id } =
      this.props;
    const { text, isEdit } = this.state;
    this.setState({ ...this.state, isEdit: !isEdit });
    handleUpdateTextClickProps(id, text);
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ text: value });
  };

  render() {
    const { isEdit } = this.state;
    const { id, text, isDone, inputChangeId } = this.props;
    return (
      <li className={style.listItem} key={id} onClick={this.handleClick}>
        {!isEdit ? (
          <>
            <p
              className={`${style.listItemText} ${isDone ? style.isDone : ""}`}
            >
              {text}
            </p>
            <button
              id="delBtn"
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
