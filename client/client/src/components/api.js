import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001",
});

instance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
      console.log(
        // for testing
        "Authorization token added to headers:",
        config.headers.Authorization
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
