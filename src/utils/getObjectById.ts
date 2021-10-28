import { Todo } from 'reducers/todos';

const getObjectById = (arr: Todo[], id: string): object => {
  const obj = arr.find((item) => item._id === id);
  return { ...obj };
};

export default getObjectById;
