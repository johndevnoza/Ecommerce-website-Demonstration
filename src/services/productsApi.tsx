import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;

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
  return await axios.get(`${apiUrl}product`).then((res) => res.data);
}

async function fetchCategories() {
  return axios.get(`${apiUrl}categories`).then((res) => res.data);
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

export function useProductSearchQuery(searchTerm: string) {
  return useQuery({
    queryKey: ["productSearch", searchTerm],
    queryFn: () => {
      return fetchProductSearch(searchTerm);
    },
  });
}

async function fetchProductSearch(searchTerm: string) {
  return axios
    .get(`${apiUrl}product?searchTerm=${searchTerm}`)
    .then((res) => res.data);
}
