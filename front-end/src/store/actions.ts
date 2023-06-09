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
  getUsers: (context: any) => {
    const url = "users";
    axiosClient.get(url).then((response) => {
      //   console.log(response);
      context.commit("setUser", response);
    });
  },
  getDocumentTypes: (context: any) => {
    const url = "document-type";
    axiosClient.get(url).then((response) => {
      //   console.log(response);
      context.commit("setDocumentType", response);
    });
  },
};

export default actions;
