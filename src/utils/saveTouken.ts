const saveToken = (token: any) => {
  sessionStorage.setItem('tokenData', JSON.stringify(token));
};

export default saveToken;
