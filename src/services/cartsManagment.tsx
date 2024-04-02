// import axios from "./baseURLAxios.ts";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// type Store = {
//   cartItems: CardProps[] | undefined;
//   addToCart: (item: CardProps) => void;
//   // removeFromCart: (item: CardProps) => void;
//   getCarts: () => void;
// };

// const useCartsStore = create<Store>()(
//   persist(
//     (set) => ({
//       cartItems: undefined,
//       getCarts: async () => {
//         const ACCESS_TOKEN = localStorage.getItem("accessToken");
//         await axios
//           .get("cart", {
//             headers: {
//               Authorization: `Bearer ${ACCESS_TOKEN}`,
//             },
//           })
//           .then((response) => {
//             console.log(response);
//             const cartItems = response.data;
//             set({ cartItems });
//           })
//           .catch((error) => {
//             console.error("Error in GET request:", error);
//             throw error;
//           });
//       },
//       addToCart: async (item) => {
//         const ACCESS_TOKEN = localStorage.getItem("accessToken");
//         const requestBody = {
//           product_id: item.id,
//         };

//         try {
//           const response = await axios.post("cart", requestBody, {
//             headers: {
//               Authorization: `Bearer ${ACCESS_TOKEN}`,
//             },
//           });
//         } catch (error) {
//           console.error("Error in POST request:", error);
//           throw error;
//         }
//       },

//       // removeFromCart: async (item) => {
//       //   const ACCESS_TOKEN = localStorage.getItem("accessToken");
//       //   const requestBody = {
//       //     product_id: item.id,
//       //   };

//       //   return await axios
//       //     .delete(`"cart"${requestBody}`)
//       //     .then((response) => {
//       //       const responseData = response.data;
//       //       set((state) => ({ cartItems: [...state.cartItems, responseData] }));
//       //       console.log("POST Request Successful:", responseData);
//       //     })
//       //     .catch((error) => {
//       //       console.error("Error in POST request:", error);
//       //       throw error;
//       //     });
//       // },
//     }),
//     {
//       name: "Cart",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useCartsStore;
