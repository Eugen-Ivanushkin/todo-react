import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { authRoutes, publicRoutes } from 'routs';
import { GetIsAuth } from 'selectors/user';

const AppRouter = () => {
  const isAuth = useSelector(GetIsAuth);
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
