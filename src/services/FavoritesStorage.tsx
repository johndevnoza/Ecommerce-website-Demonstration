import axios from "./baseURLAxios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useUserStore from "./authContext";

type Product = {
  title: string;
  price?: any;
  description?: string | undefined;
  image?: string | undefined;
  category_name?: string | undefined;
  id?: number | undefined;
};

type FavoritesStore = {
  favorites: Product[];
  addToFavorites: (product: Product) => Promise<void>;
  removeFromFavorites: (productId: number) => Promise<void>;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addToFavorites: async (product: Product) => {
        const { authorized, user, refreshToken } = useUserStore();
        if (authorized && user) {
          const ACCESS_TOKEN = localStorage.getItem("accessToken");
          await axios
            .post("/liked-products", product.id, {
              headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            })
            .then((response) => {
              set((state) => ({
                favorites: [...state.favorites, product],
              }));
            })
            .catch(async (error) => {
              if (
                (error.response && error.response.status === 401) ||
                error.response.status === 400
              ) {
                await refreshToken();
                await useFavoritesStore.getState().addToFavorites(product);
              } else {
                console.error("Error adding product to favorites:", error);
              }
            });
        } else {
          console.error("User is not authorized to add to favorites.");
        }
      },
      removeFromFavorites: async (productId: number) => {
        const { authorized, user, refreshToken } = useUserStore.getState();
        if (authorized && user) {
          await axios
            .delete(`/liked-products/${productId}`, {
              headers: { Authorization: `Bearer ${user.accessToken}` },
            })
            .then((response) => {
              set((state) => ({
                favorites: state.favorites.filter(
                  (product) => product.id !== productId
                ),
              }));
            })
            .catch(async (error) => {
              if (error.response && error.response.status === 401) {
                // Token expired, try refreshing it
                await refreshToken();
                // Retry the request
                await useFavoritesStore
                  .getState()
                  .removeFromFavorites(productId);
              } else {
                console.error("Error removing product from favorites:", error);
              }
            });
        } else {
          console.error("User is not authorized to remove from favorites.");
        }
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
