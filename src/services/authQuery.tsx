import { AUTH_QUERY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export async function getAccesToken() {
  return await localStorage.getItem("accessToken");
}
export async function authQuery() {
  return useQuery({
    queryKey: [AUTH_QUERY],
    queryFn: () => getAccesToken(),
  });
}
