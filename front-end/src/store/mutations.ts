const mutations = {
  setStudent: (state: any, payload: any) => {
    // console.log(payload);
    state.students = payload;
  },
};

export default mutations;
