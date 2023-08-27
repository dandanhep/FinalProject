import axios from "axios";

// Function to get the token from local storage
const getToken = () => {
  return localStorage.getItem("authToken"); // Adjust this to match your token key
};

const instance = axios.create({
  baseURL: "http://localhost:5001", // Adjust the URL to match your backend server
});

// Add an interceptor to set the Authorization header with the token for protected routes
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
