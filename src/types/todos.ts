import { Option } from 'const/predicates';

export interface InitialState {
  list: Array<Todo>;
  filter: Option;
}

export interface Todo {
  text: string;
  _id?: string;
  isDone?: boolean;
  sort?: number | undefined;
}

export interface Action {
  type: string;
  payload: Todo;
}

export type AddTodosPayload = Action;

export type DeleteTodosPayload = Action;

export type isDoneTodosPayload = Action;

export type UpdateTodosPayload = Action;

export interface Response {
  message: string;
  data: Todo[] | Todo;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}
