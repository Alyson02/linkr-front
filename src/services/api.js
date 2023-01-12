import axios from "axios";

export const Api = axios.create({
  baseURL: process.env.MODE === "PROD" ? "https://linkr-ipaw.onrender.com" : "http://localhost:4000",
});


Api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    config.headers.Authorization = `Bearer ${user?.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
