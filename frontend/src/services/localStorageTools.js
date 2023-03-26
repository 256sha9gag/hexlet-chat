const localStorageTools = {
  hasUserId: () => {
    const user = localStorage.getItem('userId');
    return !!(user);
  },
  removeUserId: () => localStorage.removeItem('userId'),
  setUserId: (data) => localStorage.setItem('userId', JSON.stringify(data)),
  getUser: () => localStorage.getItem('userId'),
};

export default localStorageTools;
