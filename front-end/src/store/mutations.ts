const mutations = {
  setStudent: (state: any, payload: any) => {
    // console.log(payload);
    state.students = payload;
  },
  setSettingPageName(state: any, payload: any) {
    state.routerHistory.push(payload);
    // state.visibleSettingPageName = payload;
  },
};

export default mutations;
