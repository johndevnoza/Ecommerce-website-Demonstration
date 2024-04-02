import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchCategories,
  fetchSingleCategory,
} from "./productsApi";
import { useSearchParams } from "react-router-dom";

export function useAllProductsQuery() {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useSingleCategoryQuery(
  categoryName: string | undefined,
  maxPriceFetch?: string,
  minPriceFetch?: string,
  salesFetch?: string
) {
  const queryParams = useSearchParams({
    category: categoryName || "",
    maxPrice: maxPriceFetch || "",
    minPrice: minPriceFetch || "",
    onlySales: salesFetch || "",
  });

  return useQuery({
    queryKey: ["singleCategory", queryParams.toString()],
    queryFn: () =>
      fetchSingleCategory(
        categoryName!,
        maxPriceFetch,
        minPriceFetch,
        salesFetch
      ),
    enabled: !!categoryName,
  });
}
// export function useProductSearchQuery(searchTerm: string ) {
//   return useQuery({
//     queryKey: ["productSearch", searchTerm],
//     queryFn: () => fetchProductSearch(searchTerm),
//   });
// }
