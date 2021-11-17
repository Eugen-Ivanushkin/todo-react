import { Todo } from 'types/todos';

const AddUpdateSortProperty = (prevIdx: number, idx: number, array: Todo[]) => {
  const newArray: Todo[] = array.slice();

  const sort: any = array[idx].sort;

  if (idx === array.length - 1) {
    newArray[prevIdx] = { ...newArray[prevIdx], sort: sort + 1 };
  } else if (idx === 0) {
    newArray[prevIdx] = {
      ...newArray[prevIdx],
      sort: sort / 2,
    };
  } else {
    newArray[prevIdx] = {
      ...newArray[prevIdx],
      sort: (Number(array[idx - 1].sort) + Number(array[idx + 1].sort)) / 2,
    };
  }
  return { ...newArray[prevIdx] };
};

export default AddUpdateSortProperty;
