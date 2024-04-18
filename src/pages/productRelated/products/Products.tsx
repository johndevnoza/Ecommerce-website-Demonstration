import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductCard from "@/components/ui/cards/ProductCard";
import useSearchStore from "@/services/searchContext";
import { useAllProductsQuery } from "@/services/productsQuery";
import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "@/services/useCartsQuery";
import { fetchFav } from "@/services/FavoritesStorage";
import InteractiveButton from "@/components/ui/InteractiveButton";
// import SearchResult from "@/components/ui/SearchResult";

// import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";

export const Products = ({ isHomePage }) => {
  const { data: carts } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCarts,
  });
  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFav,
  });

  const isAdded = carts ? carts.map((item) => item.product_id) : null;
  const isFAvorited = favorites
    ? favorites.map((item) => item.product_id)
    : null;

  console.log(isAdded, " id test");

  const { isPending, error, data } = useAllProductsQuery();
  const { isSearchActive } = useSearchStore();

  const goBlur: string = "blur mt-10 mb-44";

  if (isPending) return <div>Pending</div>;
  if (error) return "An error has occurred: " + error.message;
  console.log(data), " products";

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
            redirect="/products"
            showInfo
            hoverSide="right"
            hoverContent="View all products in details"
            showDialog={false}
            wrapperClass="mb-2"
          />
        </div>
      ) : null}
      <div className="flex w-full flex-col gap-6">
        <div className="grid md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
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
      </div>
    </MaxWidthWrapper>
  );
};
