import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getObjectById from '../../utils/getObjectById';

//components
import TodoListItem from '../todo-list-item';

//styles
import style from './style.module.css';

//api;
import ApiService from '../../api';

const api = new ApiService();

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const filterPredicate = {
    ['ALL']: () => true,
    ['ACTIVE']: (todos) => !todos.isDone,
    ['COMPLETED']: (todos) => todos.isDone,
  };

  const handleIsDoneClick = (id) => {
    const task = getObjectById(todos, id);
    task.isDone = !task.isDone;

    api.updateTask(task, id).then(() => {
      dispatch({ type: 'ISDONE_TODOS_TASK', payload: id });
    });
  };

  const handleUpdateTextClick = (id, newText) => {
    const task = getObjectById(todos, id);
    task.text = newText;

    api.updateTask(task, id).then(() => {
      dispatch({ type: 'UPDATE_TODOS_TASK', payload: { id, newText } });
    });
  };

  const handleDeleteClick = (id) => {
    try {
      api.deleteTask(id).then(() => {
        dispatch({ type: 'DELETE_TODOS_TASK', payload: id });
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    api.getAll().then(({ data }) => {
      dispatch({ type: 'TODOS_LOADED', payload: data });
    });
  }, []);

  const filteredTodos = todos?.filter(filterPredicate[filter]);
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
