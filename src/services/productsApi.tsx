import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
export async function fetchAllProducts() {
  return await axios.get(`${apiUrl}product`).then((res) => res.data);
}

export async function fetchCategories() {
  return await axios
    .get(`${apiUrl}categories`, { params: { _sort: "title" } })
    .then((res) => res.data);
}

export async function fetchSingleCategory(categoryId: string) {
  return await axios
    .get(`https://fakestoreapi.com/products/category/${categoryId}`)
    .then((res) => res.data);
}

export async function fetchSingleProduct(productId: number | string) {
  return await axios.get(`${apiUrl}${productId}`).then((res) => res.data);
}

export async function fetchProductSearch(searchTerm: string) {
  return await axios
    .get(`${apiUrl}product?searchTerm=${searchTerm}`)
    .then((res) => res.data);
}
