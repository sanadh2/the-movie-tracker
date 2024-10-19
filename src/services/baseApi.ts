import axios from "axios";

// Create an Axios instance
const baseApi = axios.create({
  timeout: 15000, // Increase timeout to 15 seconds
  headers: {
    "Content-Type": "application/json", // Set default content-type for JSON requests
    Accept: "application/json", // Accept JSON responses
  },
});

// Add a response interceptor to handle errors globally
baseApi.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // No response from the server (network error)
      console.error("Network Error:", error.message);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
    }

    // Retry logic: Retry the request if a network error occurs (optional)
    if (error.code === "ECONNABORTED" || !error.response) {
      console.log("Retrying request...");
      return baseApi.request(error.config); // Retry the request
    }

    return Promise.reject(error);
  }
);

export default baseApi;
