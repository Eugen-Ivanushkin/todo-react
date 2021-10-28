import React from 'react';

//styles
//@ts-ignore
import style from './style.module.css';

interface Props {
  title: string;
}

const Title = ({ title }: Props) => {
  return <h1 className={style.h1}>{title}</h1>;
};

export default Title;
