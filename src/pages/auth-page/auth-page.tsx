import React from 'react';
import { useDispatch } from 'react-redux';
import { User } from 'types/user';

//components
import AuthForm from 'components/auth-form';

// import style from './style.module.scss';

import { UserSignIn } from 'const/action_types';

const AuthPage = () => {
  const dispatch = useDispatch();

  const onSubmit = (userData: User) => {
    dispatch({ type: UserSignIn.request, payload: userData });
  };

  return (
    <div>
      <h1>Authorization</h1>
      <AuthForm onhandleSabmit={onSubmit} />
    </div>
  );
};

export default AuthPage;
