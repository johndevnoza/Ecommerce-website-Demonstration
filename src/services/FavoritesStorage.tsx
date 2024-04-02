import axios from "./baseURLAxios.ts";
import { useQuery } from "@tanstack/react-query";

export const fetchFav = async () => {
  try {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    const response = await axios.get("liked-products", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data as LikedProduct[];
  } catch (error) {
    throw error;
  }
};
export const addToFavorites = async (item: LikedProduct) => {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const requestBody = {
    product_id: item.id,
  };
  console.log(requestBody);

  return axios.post("liked-products", requestBody, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

export function favoritesQuery() {
  return useQuery({
    queryKey: ["Favorites"],
    queryFn: () => fetchFav(),
  });
}
