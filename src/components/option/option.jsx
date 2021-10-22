import React from 'react';

import style from './style.module.css';

const Filter = ({ name, onFilterChange }) => {
  const handleClick = () => {
    onFilterChange(name.toUpperCase());
  };

  return (
    <button onClick={handleClick} className={style.groupBtn}>
      {name}
    </button>
  );
};

export default Filter;
