import React from 'react';

//style
import style from './style.module.css';

//api;
import ApiService from '../../api';
import { connect } from 'react-redux';
const api = new ApiService();

class AddForm extends React.Component {
  state = {
    text: '',
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ text: value });
  };
  render() {
    const { addTask } = this.props;
    return (
      <input
        onChange={(e) => {
          this.onChange(e);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            api.addTask({ taskName: this.state.text }).then((data) => {
              addTask(data.data);
              e.target.value = '';
            });
          }
        }}
        className={style.add_input}
        placeholder="What is you done?"
      />
    );
  }
}

const mapStateToProps = ({ todos }) => {
  return { todos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (newTask) => {
      dispatch({ type: 'ADD_TODOS_TASK', payload: newTask });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
