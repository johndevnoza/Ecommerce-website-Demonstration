// import { useQuery } from "@tanstack/react-query";
import axios from "./baseURLAxios";

export async function fetchCurrentUser() {
  return await axios.get(`user/current-user`).then((res) => res.data);
}

// export function useUsersQuery() {
//   return useQuery({
//     queryKey: ["UsersQuery"],
//     queryFn: () => fetchCurrentUser(),
//   });
// }
