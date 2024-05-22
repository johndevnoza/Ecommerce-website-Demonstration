import axios from "axios";
import { getAccesToken } from "./authQuery";

const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
export const axiosBase = axios.create({
  baseURL: apiUrl,
});

export const authAxios = axios.create({
  baseURL: apiUrl,
});

authAxios.interceptors.request.use(
  async (config) => {
    const token = await getAccesToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function getStoredRefreshToken() {
  return localStorage.getItem("refreshToken");
}
function storeNewAccessToken(token) {
  localStorage.setItem("accessToken", token);
}
async function refreshToken() {
  try {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token aviable");
    }
    const response = await authAxios.post("auth/login", {
      token: refreshToken,
    });
    const newAccesToken = response.data.accessToken;
    storeNewAccessToken(newAccesToken);
    return newAccesToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
}
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newWtoken = await refreshToken();
        if (newWtoken) {
          originalRequest.headers.Authorization = `Bearer ${newWtoken}`;
          return authAxios(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
