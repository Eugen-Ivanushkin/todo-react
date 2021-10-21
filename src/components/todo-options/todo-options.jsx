import React from 'react';
import { connect } from 'react-redux';

//components
import Filter from '../option';

//style
import style from './style.module.css';

//api;
import ApiService from '../../api';
const api = new ApiService();

class TodoOptions extends React.Component {
  handleFilterChange = (actionName) => {
    this.props.onTodosChange(actionName);
  };

  handleClearClicked = () => {
    api.deleteAllComplited().then(() => {
      this.props.clearIsDoneTodosTasks();
      this.props.onTodosChange('ALL');
    });
  };

  render() {
    const { filters } = this.props;
    return (
      <div className={style.todoOptions}>
        {filters.map((item) => (
          <Filter
            onFilterChange={this.handleFilterChange}
            key={item}
            name={item}
          />
        ))}
        <button onClick={this.handleClearClicked}>Clear All</button>
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => {
  return { todos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearIsDoneTodosTasks: () => {
      dispatch({ type: 'CLEAR_ISDONE_TODOS_TASKS' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoOptions);
