import axios from "axios";
import authStore from "./auth.store";

const API = import.meta.env.VITE_BaseAPI;

const apiservice = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const setupInterceptors = () => {
  //what this next block of code does is it takes the apiservice and before a req is sent it checks if the req has bearer token in it if it doesn't it adds that to it
  apiservice.interceptors.request.use(
    (config) => {
      const token = authStore.getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  //what this does it intercepts the response and if it is a 403 error is whatauth  middleware shows when the req is with expired token then it calls a refresh route and sets up a new acess token
  apiservice.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await apiservice.post("/api/auth/refresh");
          authStore.setAccessToken(data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
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
