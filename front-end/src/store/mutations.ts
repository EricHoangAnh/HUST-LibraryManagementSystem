const mutations = {
  setStudent: (state: any, payload: any) => {
    // console.log(payload);
    state.students = payload;
  },
  setDocument: (state: any, payload: any) => {
    // console.log(payload);
    state.documents = payload;
  },
  setUserDocument: (state: any, payload: any) => {
    // console.log(payload);
    state.userDocuments = payload;
  },
  setDocumentType: (state: any, payload: any) => {
    // console.log(payload);
    state.documentTypes = payload;
  },
  setRequest: (state: any, payload: any) => {
    // console.log(payload);
    state.requests = payload;
  },
  setUser: (state: any, payload: any) => {
    // console.log(payload);
    state.users = payload;
  },
  setLoginUser: (state: any, payload: any) => {
    // console.log(payload);
    state.loginUser = payload;
  },
  setSettingPageName(state: any, payload: any) {
    state.routerHistory.push(payload);
    // state.visibleSettingPageName = payload;
  },
  setSettingAdminPageName(state: any, payload: any) {
    state.routerAdminHistory.push(payload);
    // state.visibleSettingPageName = payload;
  },
};

export default mutations;
