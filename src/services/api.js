import axios from "axios";

export const Api = axios.create({
  baseURL: "https://linkr-ipaw.onrender.com",
});

// export const Api = axios.create({
//   baseURL: "http://localhost:4000",
// });

Api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Token usado", user.token);
    config.headers.Authorization = `Bearer ${user.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
