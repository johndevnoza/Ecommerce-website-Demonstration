import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

export function useSingleCategoryQuery(categoryId: string) {
  return useQuery({
    queryKey: ["singleCategory", categoryId],
    queryFn: () => fetchSingleCategory(categoryId),
  });
}

export function useSingleProductQuery(productId: number) {
  return useQuery({
    queryKey: ["singleProduct", productId],
    queryFn: () => fetchSingleProduct(productId),
  });
}

async function fetchAllProducts() {
  return await axios
    .get("https://fakestoreapi.com/products")
    .then((res) => res.data);
}

async function fetchCategories() {
  return axios
    .get("https://fakestoreapi.com/products/categories")
    .then((res) => res.data);
}

async function fetchSingleCategory(categoryId: string) {
  return axios
    .get(`https://fakestoreapi.com/products/category/${categoryId}`)
    .then((res) => res.data);
}

async function fetchSingleProduct(productId: number) {
  return axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.data);
}
