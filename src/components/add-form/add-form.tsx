import { AddTodoTypes } from 'const/action_types';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

//style
//@ts-ignore
import style from './style.module.scss';

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
        dispatch({ type: AddTodoTypes.request, payload: { text } });
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
