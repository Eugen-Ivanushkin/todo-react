import React from 'react';

import 'regenerator-runtime/runtime';

//components
import Title from '../title';
import AddForm from '../add-form';
import TodoList from '../todo-list';
import TodoOptions from '../todo-options';

//style
//@ts-ignore
import style from './style.module.css';

const App = () => {
  return (
    <div className={style.todos}>
      <Title title="Todos" />
      <div className={style.main}>
        <AddForm />
        <TodoList />
        <TodoOptions filters={['All', 'Active', 'Completed']} />
      </div>
    </div>
  );
};

export default App;
