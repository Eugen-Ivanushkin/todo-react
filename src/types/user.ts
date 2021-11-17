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

export interface ActionToken {
  type: string;
  payload: boolean;
}

export interface ActionSort {
  type: string;
  payload: {
    prevIdx: number;
    idx: number;
  };
}

export type SignInPayload = ActionSaga;
