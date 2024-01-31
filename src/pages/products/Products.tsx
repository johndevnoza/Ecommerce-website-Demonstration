import { useAllProductsQuery } from "@/services/productsApi";
import ProductCard from "@/components/ui/cards/ProductCard";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

export const Products = () => {
  const { isPending, error, data } = useAllProductsQuery();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log("hello products");

  return (
    <MaxWidthWrapper className="mt-8">
      <div className="flex w-full flex-col gap-6">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8">
          {data.map((item: ProductData) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
