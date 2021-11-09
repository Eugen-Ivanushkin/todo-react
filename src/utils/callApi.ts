interface Action {
  method: string;
  body?: object;
}

const callApi = async (url: string, { method, body }: Action): Promise<any> => {
  //@ts-ignore
  const storage = await JSON.parse(sessionStorage.getItem('tokenData'));

  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(storage ? { Authorization: `Bearer ${storage.accessToken}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const result = await res.json();
  return result;
};

export default callApi;
