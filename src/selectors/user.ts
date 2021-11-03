import { InitialState } from 'types/user';

interface State {
  user: InitialState;
}

export const GetIsAuth = (state: State) => state.user.isAuth;
