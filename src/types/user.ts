export interface InitialState {
  isAuth: boolean;
}

export interface Action {
  type: string;
  payload?: unknown;
}

export interface User {
  email: string;
  password: string;
}

export interface ActionSaga {
  type: string;
  payload: User;
}

export type SignInPayload = ActionSaga;
