// axiosInstance.ts
import { encrypt } from "@/lib/encryption";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    // Attach current timestamp as a header
    const timestamp = Date.now().toString();
    config.headers["X-Request-Timestamp"] = encrypt(timestamp);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
