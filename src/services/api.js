import axios from "axios";

export const Api = axios.create({
  baseURL: "https://linkr-ipaw.onrender.com",
});

// export const Api = axios.create({
//   baseURL: "http://localhost:4000",
// });

Api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjczMDU4Njg3fQ.5_dMnPIzAUn0VFTlwM9o7MtguQYtO6CYKSuA4ZCqeK0`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
