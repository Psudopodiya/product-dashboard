import { config } from "@/config/config";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: config.apiBaseUrl,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token)
  );
  failedQueue = [];
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh_token");

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!refreshToken) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${config.apiBaseUrl}/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccess = response.data.access;

        // Update tokens in localStorage and Zustand
        localStorage.setItem("access_token", newAccess);
        useAuthStore.setState({ accessToken: newAccess });

        processQueue(null, newAccess);

        // Retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return axiosClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
