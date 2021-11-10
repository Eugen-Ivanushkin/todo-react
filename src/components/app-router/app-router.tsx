import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { authRoutes, publicRoutes } from 'routs';
import { GetIsAuth } from 'selectors/user';
import { UserSignIn } from 'const/action_types';

const AppRouter = () => {
  const isAuth = useSelector(GetIsAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('tokenData');
    if (isAuth) {
      dispatch({ type: UserSignIn.success });
    }
  }, []);

  return (
    <div>
      <Switch>
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} />
          ))}
        {!isAuth &&
          publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} />
          ))}
      </Switch>
    </div>
  );
};

export default AppRouter;
