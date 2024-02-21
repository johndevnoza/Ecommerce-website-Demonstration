import axios from "./baseURLAxios";
export async function fetchAllProducts() {
  return await axios.get(`product`).then((res) => res.data);
}

export async function fetchCategories() {
  return await axios.get(`product-category`).then((res) => res.data);
}

export async function fetchSingleCategory(categoryId: string) {
  return await axios
    .get(`product?categoryName=${categoryId}`)
    .then((res) => res.data);
}

// export async function fetchSingleProduct(id: string) {
//   return await axios.get(`/product?productName=${id}`).then((res) => res.data);
// }

export async function fetchProductSearch(searchUrl: string) {
  return await axios
    .get(`product?productName=${searchUrl}`)
    .then((res) => res.data);
}

// user / current - user;
