import React from 'react';

import 'regenerator-runtime/runtime';

//components
import Title from '../title';
import AddForm from '../add-form';
import TodoList from '../todo-list';
import TodoOptions from '../todo-options';

// Options
import { Option } from 'const/predicates';

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
        <TodoOptions filters={[Option.ALL, Option.ACTIVE, Option.COMPLETED]} />
      </div>
    </div>
  );
};

export default App;
