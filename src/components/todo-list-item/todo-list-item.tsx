import React, { useCallback, useRef, useState } from 'react';
import { Todo } from 'types/todos';

//style
//@ts-ignore
import style from './style.module.scss';

interface Props {
  todo: Todo;
  handleIsDoneClick: (todo: Todo) => void;
  onDeleteClick: (todo: Todo) => void;
  onUpdateTextClick: (todo: Todo, newText: string) => void;
}

const TodoListItem = (props: Props) => {
  const { todo, handleIsDoneClick, onDeleteClick, onUpdateTextClick } = props;

  const [newText, setNewText] = useState(todo.text);
  const [isEdit, setIsEdit] = useState(false);

  const waitingForClick = useRef<NodeJS.Timeout>();

  const handleClick = useCallback(
    (e) => {
      if (e.target.id === 'delBtn' || e.target.id === 'change-text-input') {
        return;
      }

      switch (e.detail) {
        case 1: // first click
          waitingForClick.current = setTimeout(() => {
            handleIsDoneClick(todo);
          }, 250);
          break;

        default:
          // more click
          if (waitingForClick.current) {
            // remove click
            clearTimeout(waitingForClick.current);
            setIsEdit(true);
            waitingForClick.current = undefined;
          }
          break;
      }
    },
    [todo]
  );

  const handleDeleteClick = useCallback(() => {
    onDeleteClick(todo);
  }, [todo]);

  const handleUpdateTextClick = useCallback(() => {
    onUpdateTextClick(todo, newText);
    setIsEdit(false);
  }, [todo, newText]);

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setNewText(value);
  }, []);

  return (
    <li className={style.listItem} key={todo._id} onClick={handleClick}>
      {!isEdit ? (
        <>
          <p
            className={`${style.listItemText} ${
              todo.isDone ? style.isDone : ''
            }`}
          >
            {todo.text}
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
          id="change-text-input"
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
