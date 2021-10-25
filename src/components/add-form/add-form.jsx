import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

//api;
import ApiService from '../../api';

//style
import style from './style.module.css';

const AddForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const api = new ApiService();

  const handleChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        api.addTask({ taskName: text }).then(({ data }) => {
          dispatch({ type: 'ADD_TODOS_TASK', payload: data });
          e.target.value = '';
        });
      }
    },
    [text]
  );

  return (
    <input
      onChange={handleChangeText}
      onKeyPress={handleKeyPress}
      className={style.add_input}
      placeholder="What is you done?"
    />
  );
};

export default AddForm;
