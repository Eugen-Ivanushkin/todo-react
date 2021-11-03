import React from 'react';

import 'regenerator-runtime/runtime';

//components
import Title from '../../components/title';
import AddForm from '../../components/add-form';
import TodoList from '../../components/todo-list';
import TodoOptions from '../../components/todo-options';

// Options
import { Option } from '../../const/predicates';

//stylea
//@ts-ignore
import style from './style.module.css';

const TodosPage = () => {
  return (
    <div className={style.todos}>
      <Title title="Todos" />
      <div className={style.main}>
        <AddForm />
        <TodoList />
        <TodoOptions filters={[Option.ALL, Option.ACTIVE, Option.COMPLETED]} />
      </div>
    </div>
  );
};

export default TodosPage;
