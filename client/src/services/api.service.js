import axios from "axios";
import authStore from "./auth.store.js";

const API = import.meta.env.VITE_BaseAPI;

const apiservice = axios.create({
  baseURL: API,
  withCredentials: true,
});

const refreshAPI = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const setupInterceptors = () => {
  apiservice.interceptors.request.use(
    (config) => {
      const token = authStore.getToken?.() || authStore.accessToken;
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiservice.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const { data } = await refreshAPI.post("/api/auth/refresh");
          authStore.setAccessToken(data.accessToken);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${data.accessToken}`,
          };

          return apiservice(originalRequest);
        } catch (refreshError) {
          authStore.logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default apiservice;
