import React, { useState } from 'react';

import 'regenerator-runtime/runtime';

//components
import Title from '../title';
import AddForm from '../add-form';
import TodoList from '../todo-list';
import TodoOptions from '../todo-options';

//style
import style from './style.module.css';

//api;
import ApiService from '../../api';

const App = () => {
  const [filter, setFilter] = useState('ALL');

  const api = new ApiService();

  const handleTodosChange = (action) => {
    switch (action) {
      case 'ACTIVE': {
        setFilter('ACTIVE');
        break;
      }
      case 'COMPLETED': {
        setFilter('COMPLETED');
        break;
      }
      default:
        setFilter('ALL');
    }
  };

  return (
    <div className={style.todos}>
      <Title title="Todos" />
      <div className={style.main}>
        <AddForm />
        <TodoList filter={filter} />
        <TodoOptions
          onTodosChange={handleTodosChange}
          filters={['All', 'Active', 'Completed']}
        />
      </div>
    </div>
  );
};

export default App;
