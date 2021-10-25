const getObjectById = (arr, id) => {
  const obj = arr.find((item) => item._id === id);
  return { ...obj };
};

export default getObjectById;
