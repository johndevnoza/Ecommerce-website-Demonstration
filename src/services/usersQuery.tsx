import { useQuery } from "@tanstack/react-query";
import { authAxios } from "./baseURLAxios";
import { USERS_QUERY } from "@/utils/constants";
import { getAccesToken } from "./authQuery";
type User = {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  accessToken?: string;
  refresh_token: string;
  id: string;
};
export async function fetchCurrentUser() {
  const isLoggedIn = getAccesToken();
  if (isLoggedIn) {
    try {
      const response = await authAxios.get(`user/current-user`);
      return (await response.data) as User;
    } catch (error) {
      console.error("Failed to fetch current user", error);
      return null;
    }
  } else return [];
}

export const updateUserTest = async (user: string) => {
  return await authAxios
    .put(`user`, user, {})
    .then((res) => res.data)
    .catch(Error);
};

export function useUsersQuery() {
  return useQuery({
    queryKey: [USERS_QUERY],
    queryFn: async () => await fetchCurrentUser(),
  });
}
