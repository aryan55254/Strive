import axios from "axios";

const API = import.meta.env.VITE_BaseAPI;

const apiservice = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default apiservice;
