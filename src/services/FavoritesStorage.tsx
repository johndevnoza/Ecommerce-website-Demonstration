import axios from "./baseURLAxios.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "./useCartsQuery.tsx";

export const fetchFav = async () => {
  try {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    const response = await axios.get("liked-products", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data as ProductData[];
  } catch (error) {
    throw error;
  }
};
export const addToFavorites = async (item: ProductData) => {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const requestBody = {
    product_id: item.id,
  };
  return axios.post("liked-products", requestBody, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};
export const removeFromFavorites = async (item: ProductData) => {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const response = axios.delete(`liked-products/${item.id}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return (await response).data;
};

export function favoritesQuery() {
  return useQuery({
    queryKey: ["Favorites"],
    queryFn: () => fetchFav(),
  });
}

// export const handleFavorites = (item: LikedProduct) => {
//   const queryClient = useQueryClient();
//   const { data, isLoading } = favoritesQuery();

//   if (isLoading) return <div>...F</div>;
//   console.log(data);
//   const isItemFavorited = data?.find(
//     (favItem) => favItem.likedProduct.id === favItem.id
//   );
//   const handleAddToFavorites = useMutation({
//     mutationFn: async (item: LikedProduct) => addToFavorites(item),
//     onSuccess: () => {
//       queryClient.invalidateQueries();
//     },
//   });
//   const handleRemoveFavorites = useMutation({
//     mutationFn: async (item: LikedProduct) => removeFromFavorites(item),
//     onSuccess: () => {
//       queryClient.invalidateQueries();
//     },
//   });
//   if (isItemFavorited) {
//     handleRemoveFavorites.mutate(item);
//   } else {
//     handleAddToFavorites.mutate(item);
//   }
// };
