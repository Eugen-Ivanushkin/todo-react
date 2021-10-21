import React from 'react';

//components
import TodoListItem from '../todo-list-item';

//styles
import style from './style.module.css';

import { connect } from 'react-redux';

//api;
import ApiService from '../../api';
const api = new ApiService();

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.filterPredicate = {
      ['ALL']: (todos) => true,
      ['ACTIVE']: (todos) => !todos.isDone,
      ['COMPLETED']: (todos) => todos.isDone,
    };
  }
  handleIsDoneClick = (id) => {
    const { isDoneTask, todos } = this.props;

    const copyTodos = todos.slice();
    const index = copyTodos.findIndex((item) => item._id === id);
    const task = { ...copyTodos.splice(index, 1)[0] };
    task.isDone = !task.isDone;

    api.updateTask(task, id).then((data) => {
      isDoneTask(id);
    });
  };

  handleUpdateTextClick = (id, newText) => {
    const { updateTask, todos } = this.props;

    const copyTodos = todos.slice();
    const index = copyTodos.findIndex((item) => item._id === id);
    const task = { ...copyTodos.splice(index, 1)[0] };
    task.text = newText;

    api.updateTask(task, id).then((data) => {
      console.log(data);
      updateTask(id, newText);
    });
  };

  handleDeleteClick = (id) => {
    const { deleteTask } = this.props;
    try {
      api.deleteTask(id).then((data) => {
        deleteTask(id);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  componentDidMount() {
    api.getAll().then(({ data }) => {
      this.props.todosLoaded(data);
    });
  }

  render() {
    const todos = this.props.todos;
    const filteredTodos = todos?.filter(
      this.filterPredicate[this.props.filter]
    );
    return (
      <ul className={style.todoList}>
        {filteredTodos?.map((el) => (
          <TodoListItem
            key={el._id}
            id={el._id}
            text={el.text}
            isDone={el.isDone}
            theClick={this.theClick}
            handleIsDoneClick={this.handleIsDoneClick}
            handleDeleteClick={this.handleDeleteClick}
            handleUpdateTextClick={this.handleUpdateTextClick}
          />
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return { todos: state.todos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    todosLoaded: (newTodos) => {
      dispatch({ type: 'TODOS_LOADED', payload: newTodos });
    },

    deleteTask: (id) => {
      dispatch({ type: 'DELETE_TODOS_TASK', payload: id });
    },

    isDoneTask: (id) => {
      dispatch({ type: 'ISDONE_TODOS_TASK', payload: id });
    },

    updateTask: (id, newText) => {
      dispatch({ type: 'UPDATE_TODOS_TASK', payload: { id, newText } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
