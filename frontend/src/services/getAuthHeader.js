const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return (userId && userId.token) ? { Authorization: `Bearer ${userId.token}` } : {};
};

export default getAuthHeader;
