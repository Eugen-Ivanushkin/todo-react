interface Action {
  method: string;
  body?: object;
}

const callApi = async (url: string, { method, body }: Action): Promise<any> => {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const result = await res.json();
  return result;
};

export default callApi;
