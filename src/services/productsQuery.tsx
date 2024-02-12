import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchCategories,
  fetchSingleCategory,
  fetchSingleProduct,
} from "./productsApi";

export function useAllProductsQuery() {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn:  fetchAllProducts,
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useSingleCategoryQuery(categoryId: string) {
  return useQuery({
    queryKey: ["singleCategory", categoryId],
    queryFn: () => fetchSingleCategory(categoryId),
  });
}

// export function useProductSearchQuery(searchTerm: string ) {
//   return useQuery({
//     queryKey: ["productSearch", searchTerm],
//     queryFn: () => fetchProductSearch(searchTerm),
//   });
// }
