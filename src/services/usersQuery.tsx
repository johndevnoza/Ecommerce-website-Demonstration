import { useQuery } from "@tanstack/react-query";
import { authAxios, getAccesToken } from "./baseURLAxios";
import { USERS_QUERY } from "@/utils/constants";

export async function fetchCurrentUser() {
  const isLoggedIn = getAccesToken();
  if (isLoggedIn) {
    try {
      const response = await authAxios.get(`user/current-user`);
      console.log(response.data);
      return await response.data;
    } catch (error) {
      throw error;
    }
  } else return [];
}

export const updateUser = async (user: User) => {
  return await authAxios
    .put(`user`, user, {})
    .then((res) => res.data)
    .catch(Error);
};

export function useUsersQuery() {
  return useQuery({
    queryKey: [USERS_QUERY],
    queryFn: fetchCurrentUser,
  });
}
