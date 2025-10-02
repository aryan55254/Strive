import axios from "axios";
import authStore from "./auth.store.js";

const API = import.meta.env.VITE_BaseAPI;

const apiservice = axios.create({
  baseURL: API,
  withCredentials: true,
});

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
        originalRequest._retry = true;

        try {
          const { data } = await apiservice.post("/api/auth/refresh");
          authStore.setAccessToken(data.accessToken);
          apiservice.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiservice(originalRequest);
        } catch (refreshError) {
          logoutHandler();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default apiservice;
