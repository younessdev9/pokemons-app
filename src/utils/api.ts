import axios from "axios";

const client = axios.create({
  // it must be a env variable in case of private server
  baseURL: "https://pokeapi.co/api/v2",
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
