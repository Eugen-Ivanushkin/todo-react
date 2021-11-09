import React from 'react';
import { useHistory } from 'react-router';

//components
import AuthForm from 'components/auth-form';

//types
import { User } from 'types/user';

//api
import ApiService from 'api';
const api = new ApiService();

// import style from './style.module.scss';

const RegisterPage = () => {
  // const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (userData: User) => {
    try {
      api.signUp(userData).then((data) => {
        console.log(data);
        history.push('/login');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <AuthForm onhandleSabmit={onSubmit} />
    </div>
  );
};

export default RegisterPage;
