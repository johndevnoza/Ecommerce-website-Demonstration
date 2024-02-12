import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
export async function fetchAllProducts() {
  return await axios.get(`${apiUrl}product`).then((res) => res.data);
}

export async function fetchCategories() {
  return await axios.get(`${apiUrl}product-category`).then((res) => res.data);
}

export async function fetchSingleCategory(categoryId: string) {
  return await axios
    .get(`${apiUrl}product?categoryName=${categoryId}`)
    .then((res) => res.data);
}

export async function fetchSingleProduct() {
  return await axios
    .get(`http://localhost:3000/product?productName=Iphone`)
    .then((res) => res.data);
}

export async function fetchProductSearch(searchUrl: string) {
  return await axios
    .get(`${apiUrl}product?productName=${searchUrl}`)
    .then((res) => res.data);
}
