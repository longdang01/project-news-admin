import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:5100/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const jwtInterceptor = axios.create({
  baseURL: "http://localhost:5100/api",
  headers: {
    "Content-Type": "application/json",
  },
});

jwtInterceptor.interceptors.request.use((config) => {
  let token = localStorage.getItem("id_token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default jwtInterceptor;
