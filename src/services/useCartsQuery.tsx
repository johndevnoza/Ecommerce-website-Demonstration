// // cartStore.js
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const response = await axios.post("cart", requestBody, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return response.data;
};

export function cartsQuery() {
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => fetchCarts(),
  });
}

export function useCartMutation() {
  return useMutation({
    mutationFn: async (item: ProductData) => addToCart(item),
  });
}

//  const { data: carts, refetch } = useQuery("carts", fetchCarts);
//  const mutation = useMutation(addToCart, {
//    onSuccess: () => {
//      refetch(); // Refresh the cart after a successful addition
//    },
//  });
// export const cartMutationFn = useMutation({
//   mutationFn: async (item: ProductData) => {
//     const ACCESS_TOKEN = localStorage.getItem("accessToken");
//     const requestBody = {
//       product_id: item.id,
//     };

//     const response = await axios.post("cart", requestBody, {
//       headers: {
//         Authorization: `Bearer ${ACCESS_TOKEN}`,
//       },
//     });

//     return response.data;
//   },

//   onSuccess: async () => {
//     const { refetch } = cartsQuery();
//     await refetch();
//   },
// });
