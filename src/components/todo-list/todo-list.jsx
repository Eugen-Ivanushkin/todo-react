import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getObjectById from '../../utils/getObjectById';

//components
import TodoListItem from '../todo-list-item';

//styles
import style from './style.module.css';

//api;
import ApiService from '../../api';

//const
import filterPredicate from '../../const/predicates';

const api = new ApiService();

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const handleIsDoneClick = useCallback(
    (id) => {
      const task = getObjectById(todos, id);
      task.isDone = !task.isDone;

      api.updateTask(task, id).then(() => {
        dispatch({ type: 'ISDONE_TODOS_TASK', payload: id });
      });
    },
    [todos]
  );

  const handleUpdateTextClick = useCallback(
    (id, newText) => {
      const task = getObjectById(todos, id);
      task.text = newText;

      api.updateTask(task, id).then(() => {
        dispatch({ type: 'UPDATE_TODOS_TASK', payload: { id, newText } });
      });
    },
    [todos]
  );

  const handleDeleteClick = useCallback((id) => {
    api.deleteTask(id).then(() => {
      dispatch({ type: 'DELETE_TODOS_TASK', payload: id });
    });
  }, []);

  useEffect(() => {
    dispatch({ type: 'ASYNC_TODOS_LOADED' });
    dispatch({ type: 'ALL' });
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
          id={el._id}
          text={el.text}
          isDone={el.isDone}
          handleIsDoneClick={handleIsDoneClick}
          onDeleteClick={handleDeleteClick}
          onUpdateTextClick={handleUpdateTextClick}
        />
      ))}
    </ul>
  );
};

export default TodoList;
