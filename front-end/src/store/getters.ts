const getters = {
  getCurrentRouter(state: any) {
    return (
      state.routerHistory.length > 0 &&
      state.routerHistory[state.routerHistory.length - 1]
    );
  },
  getCurrentAdminRouter(state: any) {
    return (
      state.routerAdminHistory.length > 0 &&
      state.routerAdminHistory[state.routerAdminHistory.length - 1]
    );
  },
  getAllUsersDatas(state: any) {
    return state.users;
  },
  getAllDocumentsDatas(state: any) {
    return state.documents;
  },
  getAllRequestsDatas(state: any) {
    return state.requests;
  },
  getAllTypesDatas(state: any) {
    return state.documentTypes;
  },
  getAllUserDocumentsDatas(state: any) {
    return state.userDocuments;
  }
};

export default getters;
