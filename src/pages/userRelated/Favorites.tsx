import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductCard from "@/components/ui/cards/ProductCard";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchFav } from "@/services/FavoritesQuery";
import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "@/services/useCartsQuery";
import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";
import { Loader2, XCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";
import SearchInComponent from "../productRelated/SearchInComponent";

const Favorites = () => {
  const [favoritesTerm, setFavoritesTerm] = useState("");
  const debauncedSearch = useDebounce(favoritesTerm, 300);

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFavoritesTerm(e.target.value);
    },
    [],
  );

  const {
    data: favorites,
    error,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: [FAVORITES_QUERY],
    queryFn: async () => await fetchFav(),
    refetchOnWindowFocus: true,
    select: (favorites) =>
      favorites
        ? favorites?.filter((item: LikedProduct) =>
            item.likedProduct.title
              .toLowerCase()
              .includes(debauncedSearch.toLowerCase()),
          )
        : null,
  });

  const { data: carts } = useQuery({
    queryKey: [CARTS_QUERY],
    queryFn: async () => await fetchCarts(),
  });

  const isAdded = carts ? carts.map((item) => item.product_id) : null;

  const productCountMap = new Map();
  if (carts) {
    carts?.forEach((item) => {
      productCountMap.set(item.product_id, item.count);
    });
  }

  if (isPending) {
    return <ProductsLoading products numberOfCards={8} />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="my-8 flex w-full flex-col gap-6">
        <SearchInComponent
          handleSearchTermChange={handleSearchTermChange}
          setFavoritesTerm={setFavoritesTerm}
          favoritesTerm={favoritesTerm}
          isPending={isLoading}
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-[440px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-2">
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
                total={productCountMap.get(f.likedProduct.id) || 0}
                category_name={f.likedProduct.category_name}
                isPageFavorites
                isInCart={isAdded && isAdded.includes(f.likedProduct.id)}
                isLoading={isLoading}
              />
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Favorites;
