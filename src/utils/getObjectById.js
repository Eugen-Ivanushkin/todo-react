const getObjectById = (arr, id) => {
  const obj = arr.filter((item) => item._id === id)[0];
  return { ...obj };
};

export default getObjectById;
