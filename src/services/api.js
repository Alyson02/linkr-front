import axios from "axios";

export const Api = axios.create({
  baseURL: "https://linkr-ipaw.onrender.com",
});

// export const Api = axios.create({
//   baseURL: "http://localhost:4000",
// });