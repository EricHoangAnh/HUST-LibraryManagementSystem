import axiosClient from "../common/api/axiosClient";

const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStudents: (context: any) => {
    const url = "student";
    axiosClient.get(url).then((response) => {
      //   console.log(response);
      context.commit("setStudent", response);
    });
  },
  getDocuments: (context: any) => {
    const url = "document";
    axiosClient.get(url).then((response) => {
      //   console.log(response);
      context.commit("setDocument", response);
    });
  },
};

export default actions;
