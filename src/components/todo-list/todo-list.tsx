import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Option } from '../../const/predicates';

//components
import TodoListItem from '../todo-list-item';

//styles
//@ts-ignore
import style from './style.module.scss';

//const
import filterPredicate from '../../const/predicates';

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

  useEffect(() => {
    dispatch({ type: TodosLoadedTypes.request });
    dispatch({ type: Option.ALL });
  }, []);
  const filteredTodos = useMemo(
    () => todos?.filter(filterPredicate[filter]),
    [filter, todos]
  );
  return (
    <ul className={style.todoList}>
      {filteredTodos?.map((el) => (
        <TodoListItem
          key={el._id}
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
