interface Action {
  method: string;
  body?: object;
  isUpdate?: boolean;
}

const callApi = async (
  url: string,
  { method, body, isUpdate }: Action
): Promise<any> => {
  //@ts-ignore
  const storage = await JSON.parse(sessionStorage.getItem('tokenData'));

  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(storage
        ? {
            Authorization: `Bearer ${
              isUpdate ? storage.refreshToken.token : storage.accessToken
            }`,
          }
        : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const result = await res.json();

  if (!res.ok) {
    throw result;
  }

  return result;
};

export default callApi;
