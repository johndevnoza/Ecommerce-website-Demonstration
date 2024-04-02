// cartStore.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./baseURLAxios.ts";
export const fetchCarts = async () => {
  try {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    const response = await axios.get("cart", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data as ProductData[];
  } catch (error) {
    throw error;
  }
};
export const addToCart = async (item: ProductData) => {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const requestBody = {
    product_id: item.id,
  };
  console.log(requestBody);

  return axios.post("cart", requestBody, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};
export const removeFromCart = async (item: ProductData) => {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const requestBody = {
    product_id: item.id,
  };
  console.log(requestBody);

  return await axios.delete(`cart/${requestBody}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

export function cartsQuery() {
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => fetchCarts(),
  });
}

// export const cartMutationFn = useMutation({
//   mutationFn: async (item: ProductData) => addToCart(item),
//   onSuccess: async () => {
//     const { refetch } = cartsQuery();
//     await refetch();
//   },
// });
