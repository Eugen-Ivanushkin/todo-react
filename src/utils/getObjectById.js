const getObjectById = (arr, id) => {
  const copyArr = arr.slice();
  const index = copyArr.findIndex((item) => item._id === id);
  const obj = JSON.parse(JSON.stringify(copyArr.splice(index, 1)[0]));
  return obj;
};

export default getObjectById;
