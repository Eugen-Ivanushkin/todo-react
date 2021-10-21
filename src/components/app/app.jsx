import React from 'react';

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
const api = new ApiService();

export default class App extends React.Component {
  state = {
    filter: 'ALL',
  };

  handleTodosChange = (action) => {
    if (action === 'ALL') {
      this.setState({ filter: 'ALL' });
    }
    if (action === 'ACTIVE') {
      this.setState({ filter: 'ACTIVE' });
    }
    if (action === 'COMPLETED') {
      this.setState({ filter: 'COMPLETED' });
    }
  };

  render() {
    return (
      <div className={style.todos}>
        <Title title="Todos" />
        <div className={style.main}>
          <AddForm />
          <TodoList filter={this.state.filter} />
          <TodoOptions
            onTodosChange={this.handleTodosChange}
            filters={['All', 'Active', 'Completed']}
          />
        </div>
      </div>
    );
  }
}
