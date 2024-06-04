import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import useDebounce from "@/hooks/useDebounce";
import { fetchFav } from "@/services/FavoritesQuery";
import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "@/services/useCartsQuery";
import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";
import { useCallback, useState } from "react";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";
import SearchInComponent from "../productRelated/SearchInComponent";
import RenderProducts from "../productRelated/products/RenderProducts";

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
  console.log(favorites);

  const { data: carts } = useQuery({
    queryKey: [CARTS_QUERY],
    queryFn: async () => await fetchCarts(),
  });

  const isAdded = (carts?.map((item) => item.product_id) ?? []).filter(
    (id): id is string => !!id,
  );
  const firstFavoriteId =
    favorites && favorites.length > 0 ? favorites[0].id : "";
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
          pageTitles="Favorites"
          handleSearchTermChange={handleSearchTermChange}
          setFavoritesTerm={setFavoritesTerm}
          favoritesTerm={favoritesTerm}
          isPending={isLoading}
        />
        <RenderProducts<LikedProduct>
          data={favorites?.map((f) => f.likedProduct) ?? []}
          isLoading={isLoading}
          secondId={firstFavoriteId}
          isInCart={isAdded}
          productCountMap={productCountMap}
          isPageFavorites
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default Favorites;
