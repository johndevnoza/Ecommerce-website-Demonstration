import axios from "./baseURLAxios";
import { create } from "zustand";
import { fetchCurrentUser } from "./usersQuery";
import { persist, createJSONStorage } from "zustand/middleware";
const REGISTER_URL = "auth/register";

type User = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: number | string;
};

type Store = {
  authorized: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  registerUser: (data: User) => Promise<void>;
};

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      authorized: false,
      user: {},
      login: async () => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
          const initialUser = await fetchCurrentUser();
          localStorage.setItem("userInfo", JSON.stringify(initialUser));
          let storedUser: User | null = null;
          const userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            storedUser = JSON.parse(userInfo);
          }
          set({ user: storedUser, authorized: true });
        }
      },
      logout: () => {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        set({ user: null, authorized: false });
      },
      registerUser: async (data) => {
        try {
          const response = await axios.post(REGISTER_URL, {
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
          });
          console.log(response);
          const token = response.data.access_token;
        } catch (error) {
          throw new Error("something went wrong");
        }
      },
    }),
    {
      name: "User-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
