import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchSingle } from "@/services/productsApi";
import { fetchCarts } from "@/services/useCartsQuery";
import { fetchFav } from "@/services/FavoritesStorage";
import { PRODUCT_QUERY, CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductDetails from "@/components/ui/cards/ProductDetails";

export default function Product() {
  const { id } = useParams() as { id: string };

  const results = useQueries({
    queries: [
      {
        queryKey: [PRODUCT_QUERY, id],
        queryFn: () => fetchSingle(id),
        staleTime: Infinity,
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

  const data = results[0]?.data?.products || [];
  const carts = results[1]?.data || [];
  const favorites = results[2]?.data || [];

  const isAdded = carts ? carts.map((item) => item.product_id) : null;
  const isFAvorited = favorites
    ? favorites.map((item) => item.product_id)
    : null;

  if (results[0].isPending) return <div>Loading...</div>;
  if (results[0].error) return <div>An error occurred</div>;

  return (
    <MaxWidthWrapper>
      {data.map((product: ProductData) => (
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
