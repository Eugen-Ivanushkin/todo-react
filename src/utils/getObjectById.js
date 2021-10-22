const getObjectById = (arr, id) => {
  const copyArr = arr.slice();
  const index = copyArr.findIndex((item) => item._id === id);
  return { ...copyArr.splice(index, 1)[0] };
};

export default getObjectById;
