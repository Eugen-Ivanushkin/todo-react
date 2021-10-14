const callApi = async (url, { method, body }) => {
  if (body) {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    return result;
  }

  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};

export default callApi;
