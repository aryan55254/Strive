import axios from "axios";
import authStore from "./auth.store.js";

const API = import.meta.env.VITE_BaseAPI;

const apiservice = axios.create({
  baseURL: API,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupInterceptors = (logoutHandler) => {
  apiservice.interceptors.request.use(
    (config) => {
      const token = authStore.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiservice.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const isAuthRoute =
        originalRequest.url.includes("/api/auth/login") ||
        originalRequest.url.includes("/api/auth/register");

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthRoute
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return apiservice(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await apiservice.post("/api/auth/refresh");
          const { accessToken } = data;

          authStore.setAccessToken(accessToken);
          apiservice.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          processQueue(null, accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiservice(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          logoutHandler();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

export default apiservice;
