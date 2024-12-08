import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    console.log(`Request made to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error response:", error.response);
    return Promise.reject(error);
  },
);

export default client;
