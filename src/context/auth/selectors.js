const authSelectors = (state) => {
  return {
    isAuthenticated: () => state.isAuthenticated,
    getUser: () => state.user,
    getToken: () => state.token,
    isRehydrated: () => state.rehydrated
  };
};

export default authSelectors;