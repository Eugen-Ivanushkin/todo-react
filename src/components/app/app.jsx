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
  sortTodosChange = (action) => {
    // const { state } = this;
    // const { todos } = this.state;
    // let sortTodos = todos.slice();
    // if (action === "ALL") {
    //   this.setState({ state, sortTodos });
    // }
    // if (action === "ACTIVE") {
    //   sortTodos = todos.filter((item) => item.isDone === false);
    //   this.setState({ ...state, sortTodos });
    // }
    // if (action === "COMPLITED") {
    //   sortTodos = todos.filter((item) => item.isDone === true);
    //   this.setState({ ...state, sortTodos });
    // }
    // if (action === "CLEARALL") {
    //   sortTodos = todos.filter((item) => item.isDone === false);
    //   this.setState({ ...state, todos: sortTodos, sortTodos });
    // }
  };

  render() {
    return (
      <div className={style.todos}>
        <Title title="Todos" />
        <div className={style.main}>
          <AddForm />
          <TodoList />
          <TodoOptions
            sortTodosChange={this.sortTodosChange}
            option={['All', 'Active', 'Complited', 'ClearAll']}
          />
        </div>
      </div>
    );
  }
}
