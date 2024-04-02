import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductCard from "@/components/ui/cards/ProductCard";
import useSearchStore from "@/services/searchContext";
import { useAllProductsQuery } from "@/services/productsQuery";
// import SearchResult from "@/components/ui/SearchResult";

// import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";

export const Products = () => {
  const { isPending, error, data } = useAllProductsQuery();
  const { isSearchActive } = useSearchStore();

  const goBlur: string = "blur mt-10 mb-44";

  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <MaxWidthWrapper className={isSearchActive ? goBlur : "mt-10 mb-44"}>
      <div className="flex w-full flex-col gap-6">
        <div className="grid md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
          {data.products.map((item: ProductData) => (
            <div key={item.id}>
              <ProductCard
                // @ts-ignore
                link={`/products/${item.id}`}
                {...item}
              />
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
