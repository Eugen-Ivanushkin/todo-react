import React from 'react';
// import { Form, Field } from 'react-final-form';

//components
import AuthForm from 'components/auth-form';

//stylea
//@ts-ignore
import style from './style.module.css';

const AuthPage = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Authorization</h1>
      <AuthForm onhandleSabmit={onSubmit} />
    </div>
  );
};

export default AuthPage;
