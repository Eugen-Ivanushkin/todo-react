import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Option } from '../../const/predicates';

//components
import TodoListItem from '../todo-list-item';

import AddUpdateSortProperty from 'utils/updateSortProperty';

//styles
import style from './style.module.scss';

//const
import filterPredicate from '../../const/predicates';

//types
import { SortTodos } from 'const/action_types';

//selectors
import { GetTodoList, GetFilter } from 'selectors/todos';
import {
  DeleteTodoTypes,
  TodosLoadedTypes,
  UpdateTodoTypes,
} from 'const/action_types';

const TodoList = () => {
  const todos = useSelector(GetTodoList);
  const filter: Option = useSelector(GetFilter);

  const dispatch = useDispatch();

  const handleIsDoneClick = useCallback(
    (todo) => {
      dispatch({
        type: UpdateTodoTypes.request,
        payload: { ...todo, isDone: !todo.isDone },
      });
    },
    [todos]
  );

  const handleUpdateTextClick = useCallback(
    (todo, newText) => {
      dispatch({
        type: UpdateTodoTypes.request,
        payload: { ...todo, text: newText },
      });
    },
    [todos]
  );

  const handleDeleteClick = useCallback((todo) => {
    dispatch({ type: DeleteTodoTypes.request, payload: { ...todo } });
  }, []);

  //drag and drop
  const handleDragStart = useCallback((e) => {
    e.target.classList.add(`selected`);
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.target.classList.remove(`selected`);
  }, []);

  const getNextElement = (cursorPosition: any, currentElement: any) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter =
      currentElementCoord.y + currentElementCoord.height / 2;

    const newIdx =
      cursorPosition <= currentElementCenter
        ? currentElement.id
        : +currentElement.nextElementSibling
        ? +currentElement.nextElementSibling?.id - 1
        : currentElement.id;

    return +newIdx;
  };

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      const activeEl = e.currentTarget.querySelector(`.selected`);
      const prevIdx = +activeEl.id;

      const currentEl = e.target;

      const idx = getNextElement(e.clientY, currentEl);
      if (prevIdx === idx) return;

      const updateTodo = AddUpdateSortProperty(prevIdx, idx, todos);

      dispatch({
        type: UpdateTodoTypes.request,
        payload: updateTodo,
      });
      dispatch({ type: SortTodos.request, payload: { prevIdx, idx } });
    },
    [todos]
  );

  useEffect(() => {
    dispatch({ type: TodosLoadedTypes.request });
    dispatch({ type: Option.ALL });
  }, []);
  const filteredTodos = useMemo(
    () => todos?.filter(filterPredicate[filter]),
    [filter, todos]
  );
  return (
    <ul
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      className={style.todoList}
    >
      {filteredTodos?.map((el, index) => (
        <TodoListItem
          key={el._id}
          id={`${index}`}
          todo={el}
          handleIsDoneClick={handleIsDoneClick}
          onDeleteClick={handleDeleteClick}
          onUpdateTextClick={handleUpdateTextClick}
        />
      ))}
    </ul>
  );
};

export default TodoList;
