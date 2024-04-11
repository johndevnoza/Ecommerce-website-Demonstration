import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductCard from "@/components/ui/cards/ProductCard";
import { fetchCarts } from "@/services/useCartsQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Shopping = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isPending, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCarts,
  });
  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MaxWidthWrapper className="mt-10 mb-44">
      <div className="grid md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
        {data?.map((f: CartProduct) => (
          <div key={f.id}>
            <ProductCard
              onClick={(event) => event.preventDefault()}
              link={`/product/productName/${f.cartProduct.title}`}
              title={f.cartProduct.title}
              price={f.cartProduct.price}
              description={f.cartProduct.description}
              image={f.cartProduct.image}
              id={f.id}
              secondId={f.cartProduct.id}
              category_name={f.cartProduct.category_name}
              isInCart
            />
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Shopping;
