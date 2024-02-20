import axios from "./baseURLAxios";
import { create } from "zustand";
import { fetchCurrentUser } from "./usersQuery";
import { persist, createJSONStorage } from "zustand/middleware";
import { useNavigate } from "react-router-dom";
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
          localStorage.setItem("User-storage", JSON.stringify(initialUser));
          let storedUser: User | null = null;
          const userInfo = localStorage.getItem("User-storage");
          if (userInfo) {
            storedUser = JSON.parse(userInfo);
          }
          set({ user: storedUser, authorized: true });
        }
      },
      logout: () => {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("accessToken");
        localStorage.removeItem("User-storage");
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
        } catch (error) {
          throw new Error("something went wrong");
        }
      },
    }),
    {
      name: "User-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
