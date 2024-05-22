// import { useQuery } from "@tanstack/react-query";
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
  const isLoggedIn = await getAccesToken();
  if (isLoggedIn) {
    return await authAxios
      .get(`user/current-user`)
      .then((res) => res.data as User);
  } else {
    return []
  }
}
export const updateUserTest = async (user: string) => {
  await authAxios
    .put(`user`, user, {})
    .then((res) => console.log(res.data, " from fetch"));
};

export function useUsersQuery() {
  return useQuery({
    queryKey: [USERS_QUERY],
    queryFn: async () => fetchCurrentUser(),
    staleTime: 0,
  });
}
