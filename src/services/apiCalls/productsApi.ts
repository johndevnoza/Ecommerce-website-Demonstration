import { axiosBase } from "../baseURLAxios";
export async function fetchAllProducts(page: string | number) {
  return await axiosBase
    .get(`/product?page=${page}&pageSize=4`)
    .then((res) => res.data)
    .catch((error) => {
      error;
    });
}
export async function fetchSales() {
  return await axiosBase.get(`/product?onlySales=true`).then((res) => res.data);
}

export async function fetchCategories() {
  return await axiosBase.get(`product-category`).then((res) => res.data);
}

export async function fetchSingleCategory(
  categoryId: string,
  maxPriceFetch?: string,
  minPriceFetch?: string,
  salesFetch?: string,
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

  return await axiosBase.get(url).then((res) => res.data);
}

export async function fetchProductSearch(searchUrl: string) {
  return await axiosBase
    .get(`product?productName=${searchUrl.toLowerCase()}`)
    .then((res) => res.data)
    .catch((error) => error.message);
}
export async function fetchSingle(productId: string) {
  return await axiosBase
    .get(`/product?productName=${productId}`)
    .then((res) => res.data)
    .catch((error) => error.message);
}
