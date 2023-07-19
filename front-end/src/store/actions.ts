import axiosClient from "../common/api/axiosClient";

const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStudents: async (context: any) => {
    const url = "student";
    // axiosClient.get(url).then((response) => {
    //   //   console.log(response);
    //   context.commit("setStudent", response);
    // });
    const res = await axiosClient.get(url);
    context.commit("setStudent", res);
  },
  getDocuments: async (context: any) => {
    const url = "document";
    // axiosClient.get(url).then((response) => {
    //   //   console.log(response);
    //   context.commit("setDocument", response);
    // }).catch((err) => console.log(err));
    const res = await axiosClient.get(url);
    context.commit("setDocument", res);
  },
  getUserDocuments: async (context: any) => {
    const url = "user-document";
    // axiosClient.get(url).then((response) => {
    //   //   console.log(response);
    //   context.commit("setDocument", response);
    // }).catch((err) => console.log(err));
    const res = await axiosClient.get(url);
    context.commit("setUserDocument", res);
  },
  getUsers: async (context: any) => {
    const url = "users";
    // axiosClient.get(url).then((response) => {
    //   //   console.log(response);
    //   context.commit("setUser", response);
    // });
    const res = await axiosClient.get(url);
    context.commit("setUser", res);
  },
  getRequests: async (context: any) => {
    const url = "request";
    // axiosClient.get(url).then((response) => {
    //   //   console.log(response);
    //   context.commit("setRequest", response);
    // });
    const res = await axiosClient.get(url);
    context.commit("setRequest", res);
  },
  getLoginUser: async (context: any) => {
    const url = "user";
    // axiosClient
    //   .get(url, { headers: { token: localStorage.getItem("token") } })
    //   .then((response: any) => {
    //     // console.log(response);
    //     context.commit("setLoginUser", response.user);
    //   }).catch((err) => console.log(err));
    const res :any = await axiosClient.get(url, { headers: { token: localStorage.getItem("token") } });
    context.commit("setLoginUser", res.user);
  },
  getDocumentTypes: async (context: any) => {
    const url = "document-type";
    // axiosClient.get(url).then((response) => {
    //   //   console.log(response);
    //   context.commit("setDocumentType", response);
    // });
    const res = await axiosClient.get(url);
    context.commit("setDocumentType", res);
  },
};

export default actions;
