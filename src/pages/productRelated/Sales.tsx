import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { fetchFav } from "@/services/FavoritesQuery";
import { useSalesQuery } from "@/services/productsQuery";
import { fetchCarts } from "@/services/useCartsQuery";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Loader2, XCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";

const Sales = () => {
  const [salesTerm, setSalesTerm] = useState("");
  const debauncedSearch = useDebounce(salesTerm, 300);

  const {
    data: sales,
    error,
    isLoading,
    isFetching,
  } = useSalesQuery(debauncedSearch);
  const { data: carts } = useQuery({
    queryKey: [CARTS_QUERY, fetchCarts],
    queryFn: fetchCarts,
  });
  const { data: favorites } = useQuery({
    queryKey: [FAVORITES_QUERY, fetchFav],
    queryFn: fetchFav,
  });
  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSalesTerm(e.target.value);
    },
    []
  );

  const isAdded = carts ? carts.map((item) => item.product_id) : null;
  const isFAvorited = favorites
    ? favorites.map((item) => item.product_id)
    : null;

  if (isLoading) return <ProductsLoading products numberOfCards={8} />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <MaxWidthWrapper className="flex flex-col gap-4 my-8 ">
      <header className="flex justify-between">
        <Button>Best offers </Button>
        <div className="relative">
          <Input
            type="text "
            value={salesTerm}
            onChange={handleSearchTermChange}
            placeholder="Search Sales"
            className="w-min"
          />
          {salesTerm && (
            <XCircle
              onClick={() => setSalesTerm("")}
              className="absolute top-2 z-40 right-1 hover:scale-110 animate-pulse"
            />
          )}
          {isFetching ? (
            <Loader2 className="absolute right-8 top-2 animate-spin" />
          ) : null}
        </div>
      </header>
      <div className="flex w-full flex-col gap-6">
        <div className="grid md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
          {sales?.map((item: ProductData) => (
            <div key={item.id}>
              <ProductCard
                link={`/product/productName/${item.title}`}
                title={item.title}
                price={item.price}
                description={item.description}
                image={item.image}
                secondId={item.id}
                id={item.id}
                category_name={item.category_name}
                isInFavorites={isFAvorited && isFAvorited.includes(item.id)}
                isInCart={isAdded && isAdded.includes(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Sales;
