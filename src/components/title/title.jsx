import React from 'react';

//styles
import style from './style.module.css';

const Title = ({ title }) => {
  return <h1 className={style.h1}>{title}</h1>;
};

export default Title;
