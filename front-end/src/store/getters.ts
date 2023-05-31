const getters = {
  getCurrentRouter(state: any) {
    return (
      state.routerHistory.length > 0 &&
      state.routerHistory[state.routerHistory.length - 1]
    );
  },
};

export default getters;
