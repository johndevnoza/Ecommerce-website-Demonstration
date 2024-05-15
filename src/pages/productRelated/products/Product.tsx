import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductDetails from "@/components/ui/cards/ProductDetails";
import { fetchFav } from "@/services/FavoritesStorage";
import { fetchProductSearch, fetchSingle } from "@/services/productsApi";
import { fetchCarts } from "@/services/useCartsQuery";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id }: any = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["single Product", id],
    queryFn: () => fetchSingle(id),
    staleTime: Infinity,
  });
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
  console.log(data, " one Product");

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <MaxWidthWrapper>
      {data.products.map((product: ProductData) => (
        <ProductDetails
          {...product}
          key={product.id}
          secondId={product.id}
          id={product.id}
          isInCart={isAdded && isAdded.includes(product.id)}
          isInFavorites={isFAvorited && isFAvorited.includes(product.id)}
        />
      ))}
    </MaxWidthWrapper>
  );
}
