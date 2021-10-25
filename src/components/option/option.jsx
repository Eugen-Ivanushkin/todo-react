import React, { useCallback } from 'react';

import style from './style.module.css';

const Filter = ({ name, onFilterChange }) => {
  const handleClick = useCallback(() => {
    onFilterChange(name.toUpperCase());
  }, [name]);

  return (
    <button onClick={handleClick} className={style.groupBtn}>
      {name}
    </button>
  );
};

export default Filter;
