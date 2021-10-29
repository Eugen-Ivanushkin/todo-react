import { ClearIsDoneTodoTypes } from 'const/action_types';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

//components
import Filter from '../option';

//style
//@ts-ignore
import style from './style.module.css';

interface Props {
  filters: Array<string>;
}

const TodoOptions = ({ filters }: Props) => {
  const dispatch = useDispatch();

  const handleFilterChange = useCallback((actionName) => {
    dispatch({ type: actionName });
  }, []);

  const handleClearClicked = useCallback(() => {
    dispatch({ type: ClearIsDoneTodoTypes.request });
    handleFilterChange('ALL');
  }, []);

  return (
    <div className={style.todoOptions}>
      {filters.map((item) => (
        <Filter onFilterChange={handleFilterChange} key={item} name={item} />
      ))}
      <button onClick={handleClearClicked}>Clear All</button>
    </div>
  );
};

export default TodoOptions;
