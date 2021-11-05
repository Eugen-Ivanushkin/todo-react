import TodosPage from 'pages/todos-page';
import UserProfilePage from 'pages/user-profile-page';

import AuthPage from 'pages/auth-page';
import RegisterPage from 'pages/register-page';

import {
  TODOS_ROUTE,
  USER_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  REDIRECT_ROUTE,
} from 'const/routes';

export const authRoutes = [
  {
    path: TODOS_ROUTE,
    Component: TodosPage,
  },
  {
    path: USER_ROUTE,
    Component: UserProfilePage,
  },
  {
    path: REDIRECT_ROUTE,
    Component: TodosPage,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: AuthPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegisterPage,
  },
  {
    path: REDIRECT_ROUTE,
    Component: AuthPage,
  },
];
