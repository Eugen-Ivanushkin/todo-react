const filterPredicate = {
  ['ALL']: () => true,
  ['ACTIVE']: (todos) => !todos.isDone,
  ['COMPLETED']: (todos) => todos.isDone,
};

export default filterPredicate;
