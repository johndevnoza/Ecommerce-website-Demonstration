import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductSearch,
  fetchSales,
  fetchSingleCategory,
} from "./apiCalls/productsApi";
import { useSearchParams } from "react-router-dom";
import {
  CATEGORIES_QUERY,
  CATEGORY_QUERY,
  PRODUCTS_QUERY,
  SALES_QUERY,
  SEARCH_QUERY,
} from "@/utils/constants";

export function useAllProductsQuery(page: string | number) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY, page],
    queryFn: () => fetchAllProducts(page),
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}
export function useSalesQuery(debauncedSearch: string) {
  return useQuery({
    queryKey: [SALES_QUERY],
    queryFn: async () => await fetchSales(),
    select: (sales) =>
      sales
        ? sales.products?.filter((item: ProductData) =>
            item.title.toLowerCase().includes(debauncedSearch.toLowerCase()),
          )
        : null,
  });
}
export function useCategoriesQuery() {
  return useQuery({
    queryKey: [CATEGORIES_QUERY, fetchCategories],
    queryFn: fetchCategories,
  });
}
export function useSingleCategoryQuery(
  categoryName: string | undefined,
  maxPriceFetch?: string,
  minPriceFetch?: string,
  salesFetch?: string,
) {
  const queryParams = useSearchParams({
    category: categoryName || "",
    maxPrice: maxPriceFetch || "",
    minPrice: minPriceFetch || "",
    onlySales: salesFetch || "",
  });

  return useQuery({
    queryKey: [CATEGORY_QUERY, queryParams.toString()],
    queryFn: () =>
      fetchSingleCategory(
        categoryName!,
        maxPriceFetch,
        minPriceFetch,
        salesFetch,
      ),
    enabled: !!categoryName,
  });
}
export function useSearchQuery() {
  return useQuery({
    queryKey: [SEARCH_QUERY],
    queryFn: () => fetchProductSearch,
  });
}
