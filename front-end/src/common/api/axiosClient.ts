import axios, { InternalAxiosRequestConfig } from "axios";
// import queryString from "query-string";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "content-type": "application/json",
  },
  //   paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config: any) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const token = localStorage.getItem("user");
    return {
      ...config,
      headers: {
        ...config.headers,
        authorization: `Bearer ${token}`,
      },
    };
  } catch (error) {
    throw error;
  }
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
