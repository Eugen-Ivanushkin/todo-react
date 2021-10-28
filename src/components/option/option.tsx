import React, { useCallback } from 'react';

//style
//@ts-ignore
import style from './style.module.css';

interface Props {
  name: string;
  onFilterChange: (name: string) => void;
}

const Filter = ({ name, onFilterChange }: Props) => {
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
