import { FAVORITES_QUERY } from "@/utils/constants.tsx";
import { authAxios } from "./baseURLAxios.ts";
import { useQuery } from "@tanstack/react-query";
import { getAccesToken } from "./authQuery.tsx";
export const fetchFav = async () => {
  const isLoggedIn = getAccesToken();
  if (isLoggedIn) {
    try {
      const response = await authAxios.get("liked-products");
      return (await response.data) as LikedProduct[];
    } catch (error) {
      throw error;
    }
  } else {
    return [];
  }
};
export const addToFavorites = async (item: string) => {
  const requestBody: requestPost = {
    product_id: item,
  };
  return authAxios.post("liked-products", requestBody);
};
export const removeFromFavorites = async (item: string) => {
  return await authAxios.delete(`liked-products/${item}`);
};

export function favoritesQuery() {
  return useQuery({
    queryKey: [FAVORITES_QUERY],
    queryFn: fetchFav,
  });
}
