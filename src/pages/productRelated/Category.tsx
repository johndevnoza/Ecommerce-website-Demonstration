import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { fetchFav } from "@/services/FavoritesStorage";
import { useSingleCategoryQuery } from "@/services/productsQuery";
import { fetchCarts } from "@/services/useCartsQuery";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Category = () => {
  const { categoryName } = useParams();
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [sales, setSales] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { data, isPending, error, refetch } = useSingleCategoryQuery(
    categoryName,
    searchParams.get("maxPrice") || "",
    searchParams.get("minPrice") || "",
    searchParams.get("sales") || ""
  );
  useEffect(() => {
    refetch();
  }, [categoryName]);

  const handleFilterClick = () => {
    setSearchParams({
      maxPrice: maxPrice,
      minPrice: minPrice,
      // sales: sales,
    });
    refetch();
  };
  const handleReset = () => {
    setSearchParams({
      maxPrice: "",
      minPrice: "",
      sales: "",
    });
    setMaxPrice("");
    setMinPrice("");
  };
  const { data: carts } = useQuery({
    queryKey: [CARTS_QUERY],
    queryFn: fetchCarts,
  });
  const { data: favorites } = useQuery({
    queryKey: [FAVORITES_QUERY],
    queryFn: fetchFav,
  });

  const isAdded = carts ? carts.map((item) => item.product_id) : null;
  const isFAvorited = favorites
    ? favorites.map((item) => item.product_id)
    : null;

  if (isPending) return <div>Loading category...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  const foundItems = data?.products.length || 0;

  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="border-border border-2 rounded-md flex flex-col p-2 justify-evenly">
        {foundItems > 0 ? (
          <span className="font-bold ">Found {foundItems} items</span>
        ) : (
          <span className="font-bold ">No items found</span>
        )}
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between gap-2 ">
          <div className="flex gap-1 max-[565px]:flex-col">
            <Input
              type="text"
              className="bg-secondary w-min"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max price"
            />

            <Input
              type="text"
              className="bg-secondary w-min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min price"
            />
          </div>
          <div className="flex max-[565px]:flex-col ">
            <Button
              variant={"secondary"}
              onClick={handleReset}
              className="max-[440px]:order-1 "
            >
              Reset
            </Button>
            <Button
              onClick={handleFilterClick}
              className="justify-end  text-justify"
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
      {data?.products && (
        <div className="grid md:grid-cols-3 gap-y-6 max-[440px]:grid-cols-1 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
          {data.products.map((item: ProductData) => (
            <div key={item.id}>
              <ProductCard
                link={`/product/productName/${item.title}`}
                {...item}
                id={item.id}
                secondId={item.id}
                isInCart={isAdded && isAdded.includes(item.id)}
                isInFavorites={isFAvorited && isFAvorited.includes(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
