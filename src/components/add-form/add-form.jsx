import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

//style
import style from './style.module.css';

const AddForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        dispatch({ type: 'ASYNC_ADD_TODOS_TASK', payload: text });
        e.target.value = '';
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
