import axios from "./baseURLAxios";
export async function fetchAllProducts() {
  return await axios.get(`product`).then((res) => res.data);
}

export async function fetchCategories() {
  return await axios.get(`product-category`).then((res) => res.data);
}

export async function fetchSingleCategory(
  categoryId: string,
  maxPriceFetch?: string,
  minPriceFetch?: string,
  salesFetch?: string
) {
  let url = `product?categoryName=${categoryId}`;
  if (maxPriceFetch) {
    url += `&maxPrice=${maxPriceFetch}`;
  }
  if (minPriceFetch) {
    url += `&minPrice=${minPriceFetch}`;
  }
  if (salesFetch) {
    url += `&&onlySales=${salesFetch}`;
  }

  return await axios.get(url).then((res) => res.data);
}

export async function fetchProductSearch(searchUrl: string) {
  return await axios
    .get(`product?productName=${searchUrl}`)
    .then((res) => res.data);
}
export async function fetchSingle(productId: string) {
  return await axios
    .get(`/product?productName=${productId}`)
    .then((res) => res.data);
}
