import { Todo } from 'types/todos';

export const enum Option {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

type FilterPredicate = {
  [key in Option]: (todos: Todo) => boolean;
};

const filterPredicate: FilterPredicate = {
  [Option.ALL]: () => true,
  [Option.ACTIVE]: (todos: Todo) => !todos.isDone,
  [Option.COMPLETED]: (todos: Todo) => !!todos.isDone,
};

export default filterPredicate;
