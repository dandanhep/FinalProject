import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001",
});

// Add an interceptor to modify the request before it is sent
instance.interceptors.request.use(
  (config) => {
    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem("authToken");

    // If an authentication token exists, add it to the request headers
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;

      // Log the added authorization token for testing purposes
      console.log(
        "Authorization token added to headers:",
        config.headers.Authorization
      );
    }

    // Return the modified configuration to continue with the request
    return config;
  },
  (error) => {
    // If there is an error, reject the promise with the error
    return Promise.reject(error);
  }
);

// Export the configured axios instance for use in other parts of your application
export default instance;
