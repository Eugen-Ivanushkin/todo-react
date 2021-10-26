import React from 'react';

//styles
//@ts-ignore
import style from './style.module.css';

interface titleProps {
  title: string;
}

const Title: React.FC<titleProps> = ({ title }) => {
  return <h1 className={style.h1}>{title}</h1>;
};

export default Title;
