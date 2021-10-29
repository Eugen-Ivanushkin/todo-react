const getObjectById = <Type extends { _id: string }>(
  arr: Type[],
  id: string
): Type | undefined => {
  return arr.find((item) => item._id === id);
};

export default getObjectById;
