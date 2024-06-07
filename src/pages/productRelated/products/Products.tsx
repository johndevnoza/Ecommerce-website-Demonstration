import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
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
import { useCallback, useState } from "react";
import { ErrorFetchingProducts } from "@/components/ui/ComponentErrors/ErrorFetchingProducts";
import SearchInComponent from "../SearchInComponent";
import useDebounce from "@/hooks/useDebounce";
import RenderProducts from "./RenderProducts";
import { fetchAllProducts } from "@/services/apiCalls/productsApi";

export const Products = ({ isHomePage }: { isHomePage: boolean }) => {
  const page = Number(useParams().page);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );
  const results = useQueries({
    queries: [
      {
        queryKey: [PRODUCTS_QUERY, page],
        queryFn: () => fetchAllProducts(page),
        placeholderData: keepPreviousData,
        select: (data: ProductData) => {
          if (!isHomePage && debouncedSearch) {
            const filteredProducts = data?.products?.filter(
              (item: ProductData) =>
                item.title
                  .toLowerCase()
                  .includes(debouncedSearch.toLowerCase()),
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

  const isAdded = (carts?.data?.map((item) => item.product_id) ?? []).filter(
    (id): id is string => !!id,
  );
  const isFavorited = (
    favorites?.data?.map((item) => item.product_id) ?? []
  ).filter((id): id is string => !!id);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(products?.data?.total / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  const productCountMap = new Map();
  if (carts?.data) {
    carts.data.forEach((item) => {
      productCountMap.set(item.product_id, item.count);
    });
  }
  if (products.isPending)
    return (
      <>
        {isHomePage ? (
          <ProductsLoading homePageProducts={isHomePage} numberOfCards={4} />
        ) : (
          <div className="flex flex-col items-center">
            <ProductsLoading products numberOfCards={4} />
            <Pagination
              isHomePage={isHomePage}
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
    <div>
      <MaxWidthWrapper className={isHomePage ? "px-0 md:px-0" : "mt-8"}>
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
              pageTitles="All Products"
              isHomePage={isHomePage}
              setFavoritesTerm={setSearchTerm}
              favoritesTerm={searchTerm}
              isPending={false}
              handleSearchTermChange={handleSearchTermChange}
            />
          </>
        )}
        <section className="mt-2 flex flex-col">
          <RenderProducts<ProductData>
            data={products.data.products}
            isLoading={products.isRefetching}
            isInCart={isAdded}
            isInFavorites={isFavorited}
            productCountMap={productCountMap}
          />
          <div className="flex w-full justify-center">
            <Pagination
              isHomePage={isHomePage}
              totalPage={pageNumbers}
              currentPage={page}
              previous={page - 1}
              next={page + 1}
              isFetching={products.isPlaceholderData}
            />
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};
