import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
// import { authRoutes, publicRoutes } from 'routs';
import { GetIsAuth } from 'selectors/user';

import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  TODOS_ROUTE,
  USER_ROUTE,
} from 'const/routes';

//components
import UserProfilePage from 'pages/user-profile-page/user-profile-page';
import AuthPage from 'pages/auth-page/auth-page';
import RegisterPage from 'pages/register-page/register-page';
import TodosPage from 'pages/todos-page/todos-page';

const AppRouter = () => {
  const isAuth = useSelector(GetIsAuth);
  return (
    <div>
      <Routes>
        {/* public */}
        {!isAuth && (
          <Route path={REGISTRATION_ROUTE} element={<RegisterPage />} />
        )}
        {!isAuth && <Route path={LOGIN_ROUTE} element={<AuthPage />} />}
        {!isAuth && <Route path={'/'} element={<AuthPage />} />}

        {/* public */}
        {isAuth && <Route path={USER_ROUTE} element={<UserProfilePage />} />}
        {isAuth && <Route path={TODOS_ROUTE} element={<TodosPage />} />}
        {isAuth && <Route path={'/'} element={<TodosPage />} />}

        {/* {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))} */}
      </Routes>
    </div>
  );
};

export default AppRouter;
