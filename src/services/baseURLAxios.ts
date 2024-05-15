import axios from "axios";
import { getAccesToken } from "./authQuery";
import { useQueryClient } from "@tanstack/react-query";

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

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response) {
//       const { status } = error.response;
//       if (status === 401) {
//         try {
//           const { user } = useUserStore();
//           const userId = user?.id;

//           const refreshToken = localStorage.getItem("refresh_token");
//           console.log(refreshToken);
//           if (refreshToken) {
//             return await instance
//               .post(`/auth/refresh-token/${userId}`, refreshToken)
//               .then((res) => console.log(res,"refresh token"));
//           } else {
//             const { logout } = useUserStore();
//             const navigate = useNavigate();
//             console.log("Logging out...");
//             logout();
//             navigate("/");
//             delete axios.defaults.headers.common["Authorization"];
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("User-storage");
//           }
//         } catch (error) {
//           console.error(error);
//           console.log("Logging out...");
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );
