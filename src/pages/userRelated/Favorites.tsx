import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Input } from "@/components/ui/input";
import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";
import useDebounce from "@/hooks/useDebounce";
import { fetchFav } from "@/services/FavoritesStorage";
import { fetchCarts } from "@/services/useCartsQuery";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Loader2, XCircle } from "lucide-react";
import { useCallback, useState } from "react";

const Favorites = () => {
  const [favoritesTerm, setFavoritesTerm] = useState("");
  const debauncedSearch = useDebounce(favoritesTerm, 300);
  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFavoritesTerm(e.target.value);
    },
    []
  );

  const {
    data: favorites,
    error,
    status,
    isPending,
  } = useQuery({
    queryKey: [FAVORITES_QUERY],
    queryFn: async () => await fetchFav(),
    refetchOnWindowFocus: true,
    select: (favorites) =>
      favorites
        ? favorites?.filter((item: LikedProduct) =>
            item.likedProduct.title
              .toLowerCase()
              .includes(debauncedSearch.toLowerCase())
          )
        : null,
  });

  const { data: carts } = useQuery({
    queryKey: [CARTS_QUERY],
    queryFn: async () => await fetchCarts(),
  });

  const isAdded = carts ? carts.map((item) => item.product_id) : null;

  if (status === "pending") {
    return <ProductsLoading products numberOfCards={8} />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="flex w-full flex-col gap-6 my-8">
        <header className="flex justify-between items-center gap-4  border-border border-2 p-2  rounded-md">
          <Button className="" variant={"secondary"}>
            Favorited
          </Button>
          <div className="relative">
            <Input
              type="text "
              value={favoritesTerm}
              onChange={handleSearchTermChange}
              placeholder="Search favorited"
              className=""
            />
            {favoritesTerm && (
              <XCircle
                onClick={() => setFavoritesTerm("")}
                className="absolute top-2 z-40 right-1 hover:scale-110 animate-pulse"
              />
            )}
            {isPending ? (
              <Loader2 className="absolute right-8 top-2 animate-spin" />
            ) : null}
          </div>
        </header>
        <div className="grid max-[440px]:grid-cols-1 md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
          {favorites?.map((f: LikedProduct) => (
            <div key={f.id}>
              <ProductCard
                link={`/product/productName/${f.likedProduct.title}`}
                title={f.likedProduct.title}
                price={f.likedProduct.price}
                description={f.likedProduct.description}
                image={f.likedProduct.image}
                secondId={f.likedProduct.id}
                id={f.id}
                total={f.count}
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
