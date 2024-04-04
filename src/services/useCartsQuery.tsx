// cartStore.js
import axios from "./baseURLAxios.ts";
export const fetchCarts = async () => {
  try {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    const response = await axios.get("cart", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data as CartProduct[];
  } catch (error) {
    throw error;
  }
};
export const addToCart = async (item: string) => {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const requestBody: requestPost = {
    product_id: item,
  };
  console.log(requestBody);

  return axios.post("cart", requestBody, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};
export const removeFromCart = async (item: string) => {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  return await axios.delete(`cart/${item}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

// export const cartMutationFn = useMutation({
//   mutationFn: async (item: ProductData) => addToCart(item),
//   onSuccess: async () => {
//     const { refetch } = cartsQuery();
//     await refetch();
//   },
// });
