import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductCard from "@/components/ui/cards/ProductCard";
import useSearchStore from "@/services/searchContext";
import { useAllProductsQuery } from "@/services/productsQuery";
import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "@/services/useCartsQuery";
import { fetchFav } from "@/services/FavoritesStorage";
import InteractiveButton from "@/components/ui/InteractiveButton";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";
import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";
import { useParams } from "react-router-dom";
import Pagination from "@/components/ui/Pagination";

export const Products = ({ isHomePage }: { isHomePage: boolean }) => {
  const { data: carts } = useQuery({
    queryKey: [CARTS_QUERY, fetchCarts],
    queryFn: fetchCarts,
  });
  const { data: favorites } = useQuery({
    queryKey: [FAVORITES_QUERY, fetchFav],
    queryFn: fetchFav,
  });
  const isAdded = carts ? carts.map((item) => item.product_id) : null;
  const isFAvorited = favorites
    ? favorites.map((item) => item.product_id)
    : null;

  const { isSearchActive } = useSearchStore();
  const goBlur: string = "blur mt-10 mb-44";

  const page = Number(useParams().page);
  const { isPending, error, data, isLoading } = useAllProductsQuery(page);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(data?.total / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  if (isPending || isLoading)
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
              isFetching={isLoading}
            />
          </div>
        )}
      </>
    );
  if (error) return "An error has occurred: " + error.message;

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
      ) : null}
      <div className="flex w-full flex-col gap-6">
        <div className="grid max-[440px]:grid-cols-1  grid-cols-2 md:grid-cols-3 gap-y-6  gap-x-6 lg:grid-cols-4  lg:gap-x-2">
          {data.products.map((item: ProductData) => (
            <div key={item.id}>
              <ProductCard
                link={`/product/productName/${item.title}`}
                {...item}
                secondId={item.id}
                id={item.id}
                isInCart={isAdded && isAdded.includes(item.id)}
                isInFavorites={isFAvorited && isFAvorited.includes(item.id)}
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
              isFetching={isLoading}
            />
          ) : null}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
