import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;

export function useCarts(cartId: number) {
  return useQuery({
    queryKey: ["Carts", cartId],
    queryFn: () => fetchCarts(cartId),
  });
}
async function fetchCarts(cartId: number) {
  return axios.get(`${apiUrl}product/${cartId}`).then((res) => res.data);
}
