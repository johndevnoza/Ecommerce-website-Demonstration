import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductCard from "@/components/ui/cards/ProductCard";
import useSearchStore from "@/services/searchContext";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { fetchCarts } from "@/services/useCartsQuery";
import { fetchFav } from "@/services/FavoritesQuery";
import InteractiveButton from "@/components/ui/InteractiveButton";
import {
  CARTS_QUERY,
  FAVORITES_QUERY,
  PRODUCTS_QUERY,
} from "@/utils/constants";
import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";
import { useParams } from "react-router-dom";
import Pagination from "@/components/ui/Pagination";
import { fetchAllProducts } from "@/services/productsApi";
import { useCallback, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { ErrorFetchingProducts } from "@/components/ui/ComponentErrors/ErrorFetchingProducts";
import SearchInComponent from "../SearchInComponent";

export const Products = ({ isHomePage }: { isHomePage: boolean }) => {
  const { isSearchActive } = useSearchStore();
  const goBlur: string = "blur mt-10 mb-44";
  // const [filterSelect, setFilterSelect] = useState({
  //   alphabetical: false,
  //   priceHigh: false,
  //   priceLow: false,
  //   newest: false,
  //   oldest: false,
  // });
  const page = Number(useParams().page);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );
  const results = useQueries({
    queries: [
      {
        queryKey: [PRODUCTS_QUERY, page],
        queryFn: () => fetchAllProducts(page),
        placeholderData: keepPreviousData,
        select: (data) => {
          if (!isHomePage && debouncedSearch) {
            const filteredProducts = data.products?.filter(
              (item: ProductData) =>
                item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
            return { ...data, products: filteredProducts };
          } else {
            return data;
          }
        },
      },

      {
        queryKey: [CARTS_QUERY],
        queryFn: fetchCarts,
      },
      {
        queryKey: [FAVORITES_QUERY],
        queryFn: fetchFav,
      },
    ],
  });

  const products = results[0];
  const carts = results[1];
  const favorites = results[2];
  const isAdded = carts ? carts.data?.map((item) => item.product_id) : null;
  const isFavorited = favorites
    ? favorites.data?.map((item) => item.product_id)
    : null;

  const itemsPerPage = 4;
  const totalPages = Math.ceil(products?.data?.total / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const productCountMap = new Map();
  if (carts?.data) {
    carts.data.forEach((item) => {
      productCountMap.set(item.product_id, item.count);
    });
  }

  // const TestSort = products?.data?.products?.sort((a, b) => a.price - b.price);
  // console.log(products.data?.products);
  // console.log(TestSort, "sort");
  if (products.isPending || products.isLoading)
    return (
      <>
        {isHomePage ? (
          <ProductsLoading homePageProducts={isHomePage} numberOfCards={4} />
        ) : (
          <div className="flex flex-col items-center">
            <ProductsLoading products numberOfCards={4} />
            <Pagination
              totalPage={pageNumbers}
              currentPage={page}
              previous={page - 1}
              next={page + 1}
              isFetching={results[0].isFetching}
            />
          </div>
        )}
      </>
    );
  if (products?.error) return <ErrorFetchingProducts />;

  return (
    <MaxWidthWrapper
      className={isSearchActive ? goBlur : isHomePage ? "px-0 md:px-0" : "mt-8"}
    >
      {isHomePage ? (
        <div>
          <InteractiveButton
            title={"All products"}
            buttonVariant="secondary"
            buttonClass="w-min"
            link
            redirect={`/products/page/${1}`}
            showInfo
            hoverSide="right"
            hoverContent="View all products in details"
            showDialog={false}
            wrapperClass="mb-2"
          />
        </div>
      ) : (
        <>
          <SearchInComponent
            setFavoritesTerm={setSearchTerm}
            favoritesTerm={searchTerm}
            isPending={false}
            handleSearchTermChange={handleSearchTermChange}
          />
        </>
      )}
      <div className="flex w-full flex-col gap-6 mt-2">
        <div className="grid max-[440px]:grid-cols-1  grid-cols-2 md:grid-cols-3 gap-y-6  gap-x-6 lg:grid-cols-4  lg:gap-x-2">
          {products.data.products?.map((item: ProductData) => (
            <div key={item.id}>
              <ProductCard
                link={`/product/productName/${item.title}`}
                {...item}
                secondId={item.id}
                id={item.id}
                isInCart={isAdded && isAdded.includes(item.id)}
                isInFavorites={isFavorited && isFavorited.includes(item.id)}
                isLoading={products.isRefetching}
                total={productCountMap.get(item.id) || null}
              />
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center">
          {!isHomePage ? (
            <Pagination
              totalPage={pageNumbers}
              currentPage={page}
              previous={page - 1}
              next={page + 1}
              isFetching={products.isPlaceholderData}
            />
          ) : null}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
