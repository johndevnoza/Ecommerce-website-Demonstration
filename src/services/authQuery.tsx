import { AUTH_QUERY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export function getAccesToken() {
  const token = localStorage.getItem("accessToken");
  if (token?.length && token?.length > 0) return token;
  else return false;
}

export function authQuery() {
  return useQuery({
    queryKey: [AUTH_QUERY],
    queryFn: getAccesToken,
  });
}
