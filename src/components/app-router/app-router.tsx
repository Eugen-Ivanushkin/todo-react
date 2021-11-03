import { LOGIN_ROUTE } from 'const/routes';
import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes, publicRoutes } from 'routs';
import { GetIsAuth } from 'selectors/user';

const AppRouter = () => {
  const isAuth = useSelector(GetIsAuth);
  return (
    <Switch>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
