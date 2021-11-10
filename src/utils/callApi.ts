interface Action {
  method: string;
  body?: object;
  isUpdate?: boolean;
}

const callApi = async <T extends {}>(
  url: string,
  { method, body, isUpdate }: Action
): Promise<T> => {
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

  // if (result.status === 401) {
  //   const response = await callApi<any>('/refresh-token', {});
  //   const result = await response.json();

  //   if (!result.ok) {
  //     // throwError
  //   }

  //   return await callApi<T>(url, { method, body, isUpdate });
  // }

  if (!res.ok) {
    throw result;
  }

  return result;
};

export default callApi;
