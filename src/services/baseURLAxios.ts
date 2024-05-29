import axios from "axios";

const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
export const axiosBase = axios.create({
  baseURL: apiUrl,
});
export const authAxios = axios.create({
  baseURL: apiUrl,
});
export const loginAxios = axios.create({
  baseURL: apiUrl,
});
export function getAccesToken() {
  const token = localStorage.getItem("accessToken");
  if (token?.length && token?.length > 0) return token;
  else return false;
}

function getStoredRefreshToken() {
  return localStorage.getItem("refreshToken");
}
function storeNewTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}
loginAxios.interceptors.request.use(
  async (config) => {
    const token = getAccesToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.request.use(
  async (config) => {
    const token = getAccesToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return Promise.reject(new Error("No access token available"));
    }
  },
  (error) => Promise.reject(error)
);

async function refreshToken() {
  try {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token aviable");
    }
    const response = await authAxios.post("auth/update-tokens", {
      refresh_token: refreshToken,
    });
    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;
    storeNewTokens({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
    return newAccessToken;
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
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return authAxios(originalRequest);
        } else {
          localStorage.removeItem("accessToken");
          return Promise.reject(error);
        }
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
