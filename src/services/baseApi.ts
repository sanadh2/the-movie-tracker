import { env } from "@/lib/env";
import axios from "axios";

const baseApi = axios.create({
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
});

baseApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error happened");
    if (error.response) {
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Error:", error.message);
    }

    if (error.code === "ECONNABORTED" || !error.response) {
      console.log("Retrying request...");
      return baseApi.request(error.config);
    }

    return Promise.reject(error);
  }
);

export default baseApi;
