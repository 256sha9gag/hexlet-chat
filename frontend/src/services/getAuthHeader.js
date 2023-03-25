const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  // eslint-disable-next-line functional/no-expression-statements
  console.log(userId);
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export default getAuthHeader;
