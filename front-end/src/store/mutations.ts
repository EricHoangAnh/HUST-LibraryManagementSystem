const mutations = {
  setStudent: (state: any, payload: any) => {
    // console.log(payload);
    state.students = payload;
  },
  setDocument: (state: any, payload: any) => {
    // console.log(payload);
    state.documents = payload;
  },
  setDocumentType: (state: any, payload: any) => {
    // console.log(payload);
    state.documentTypes = payload;
  },
  setUser: (state: any, payload: any) => {
    // console.log(payload);
    state.users = payload;
  },
  setSettingPageName(state: any, payload: any) {
    state.routerHistory.push(payload);
    // state.visibleSettingPageName = payload;
  },
};

export default mutations;
