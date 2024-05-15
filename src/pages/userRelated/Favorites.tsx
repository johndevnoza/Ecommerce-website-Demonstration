import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Input } from "@/components/ui/input";
import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { favoritesQuery } from "@/services/FavoritesStorage";
import { fetchCarts } from "@/services/useCartsQuery";
import { CARTS_QUERY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Divide, Loader2, XCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const {
    data: favorites,
    isLoading,
    isError,
    error,
    isPending,
    isFetching,
  } = favoritesQuery();

  const { data: carts } = useQuery({
    queryKey: [CARTS_QUERY],
    queryFn: fetchCarts,
  });

  const [favoritesTerm, setFavoritesTerm] = useState("");
  const debauncedSearch = useDebounce(favoritesTerm, 300);
  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFavoritesTerm(e.target.value);
    },
    []
  );
  const filterFavorites = favorites
    ? favorites?.filter((item: LikedProduct) =>
        item.likedProduct.title
          .toLowerCase()
          .includes(debauncedSearch.toLowerCase())
      )
    : null;
  const isAdded = carts ? carts.map((item) => item.product_id) : null;
  const favoritesTotal = favorites?.length;
  const navigate = useNavigate();
  if (isLoading || isPending) {
    return <ProductsLoading products numberOfCards={8} />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="flex w-full flex-col gap-6 my-8">
        <header className="flex justify-between items-center gap-4  border-border border-2 p-2  rounded-md">
          <Button className="" variant={"secondary"}>
            Favorited
          </Button>
          <div className="flex gap-4 items-center  w-[40%]">
            {favorites ? (
              <div className="relative min-w-full">
                <Input
                  type="text "
                  value={favoritesTerm}
                  onChange={handleSearchTermChange}
                  placeholder="Search favorited"
                  className="min-w-[30%]"
                />
                {debauncedSearch && (
                  <XCircle
                    onClick={() => setFavoritesTerm("")}
                    className="absolute top-2 z-40 right-1 hover:scale-110 animate-pulse"
                  />
                )}
                {isFetching ? (
                  <Loader2 className="absolute right-8 top-2 animate-spin" />
                ) : null}
              </div>
            ) : null}
            <div className="min-w-24 line-clamp-1">
              {favoritesTerm !== "" ? (
                filterFavorites ? (
                  <div className="hidden md:block">
                    Found {filterFavorites.length}
                  </div>
                ) : (
                  <div>Not Found</div>
                )
              ) : null}
            </div>
          </div>
          <div className=" place-self-end py-2 h-full">
            {favoritesTerm === "" ? (
              filterFavorites?.length ? (
                <span className="font-bold p-4">
                  Total items{favoritesTotal}
                </span>
              ) : isFetching ? (
                <Loader2 />
              ) : null
            ) : (
              <div className="font-bold min-w-0">
                Total items{favoritesTotal}
              </div>
            )}
          </div>
        </header>
        <div className="grid max-[440px]:grid-cols-1 md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
          {favoritesTerm !== ""
            ? filterFavorites
              ? filterFavorites?.map((f: LikedProduct) => (
                  <div key={f.id}>
                    <ProductCard
                      link={`/product/productName/${f.likedProduct.title}`}
                      title={f.likedProduct.title}
                      price={f.likedProduct.price}
                      description={f.likedProduct.description}
                      image={f.likedProduct.image}
                      secondId={f.likedProduct.id}
                      id={f.id}
                      category_name={f.likedProduct.category_name}
                      isPageFavorites
                      isInCart={isAdded && isAdded.includes(f.likedProduct.id)}
                    />
                  </div>
                ))
              : null
            : favorites?.map((f: LikedProduct) => (
                <div key={f.id}>
                  <ProductCard
                    link={`/product/productName/${f.likedProduct.title}`}
                    title={f.likedProduct.title}
                    price={f.likedProduct.price}
                    description={f.likedProduct.description}
                    image={f.likedProduct.image}
                    secondId={f.likedProduct.id}
                    id={f.id}
                    category_name={f.likedProduct.category_name}
                    isPageFavorites
                    isInCart={isAdded && isAdded.includes(f.likedProduct.id)}
                  />
                </div>
              ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Favorites;
