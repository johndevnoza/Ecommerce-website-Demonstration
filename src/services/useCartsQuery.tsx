// cartStore.tsx
import { getAccesToken } from "./authQuery.tsx";
import { authAxios } from "./baseURLAxios.ts";
export const fetchCarts = async () => {
  const isLoggedIn = getAccesToken();
  if (isLoggedIn) {
    try {
      const response = await authAxios.get("cart");
      return (await response.data) as CartProduct[];
    } catch (error) {
      throw error;
    }
  } else {
    return [];
  }
};
export const addToCart = async (item: string) => {
  const requestBody: requestPost = {
    product_id: item,
  };
  return authAxios.post("cart", requestBody);
};
export const decreaseFromCart = async (item: string) => {
  return await authAxios.delete(`cart/${item}`, {}).catch((error) => {
    error.message;
  });
};
export const removeFromCart = async (item: string) => {
  return await authAxios.delete(`cart/${item}?removeAll=true`, {});
};
export const buyItems = async ({
  product_id,
  totalPrice,
  totalItems,
}: PaymentProps) => {
  const requestBody: PaymentProps = {
    product_id: product_id,
    totalPrice: totalPrice,
    totalItems: totalItems,
  };
  authAxios.post(
    `purchases`,
    requestBody,

    {}
  );
};
