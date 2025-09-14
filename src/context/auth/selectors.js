const authSelectors = (state) => {
  return {
    isAuthenticated: () => state.isAuthenticated,
    getUser: () => state.user,
    getToken: () => state.token,
  };
};

export default authSelectors;