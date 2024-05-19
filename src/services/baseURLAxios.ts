import axios from "axios";
import { getAccesToken } from "./authQuery";

const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
export const axiosBase = axios.create({
  baseURL: apiUrl,
});

export const authAxios = axios.create({
  baseURL: apiUrl,
});

authAxios.interceptors.request.use(async (config) => {
  const token = await getAccesToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
