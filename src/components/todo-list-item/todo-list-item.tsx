import React, { useCallback, useState } from 'react';

//style
//@ts-ignore
import style from './style.module.css';

interface Props {
  id: string;
  text: string;
  isDone: boolean;
  handleIsDoneClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  onUpdateTextClick: (id: string, newText: string) => void;
}

const TodoListItem = (props: Props) => {
  const {
    id,
    text,
    isDone,
    handleIsDoneClick,
    onDeleteClick,
    onUpdateTextClick,
  } = props;

  const [newText, setNewText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  let waitingForClick: any = false;

  const handleClick = useCallback((e) => {
    if (e.target.id === 'delBtn') {
      return;
    }

    switch (e.detail) {
      case 1: // first click
        waitingForClick = setTimeout(() => {
          handleIsDoneClick(id);
        }, 250);
        break;

      default:
        // more click
        if (waitingForClick) {
          // remove click
          clearTimeout(waitingForClick);
          setIsEdit(true);
          waitingForClick = false;
        }
        break;
    }
  }, []);

  const handleDeleteClick = useCallback(() => {
    onDeleteClick(id);
  }, [id]);

  const handleUpdateTextClick = useCallback(() => {
    onUpdateTextClick(id, newText);
    setIsEdit(false);
  }, [id, newText]);

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setNewText(value);
  }, []);

  return (
    <li className={style.listItem} key={id} onClick={handleClick}>
      {!isEdit ? (
        <>
          <p className={`${style.listItemText} ${isDone ? style.isDone : ''}`}>
            {text}
          </p>
          <button
            id="delBtn"
            onClick={handleDeleteClick}
            className={style.listItemBtn}
          >
            x
          </button>
        </>
      ) : (
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          value={newText}
          onBlur={handleUpdateTextClick}
          className={style.updateInput}
          autoFocus
        />
      )}
    </li>
  );
};

export default TodoListItem;
