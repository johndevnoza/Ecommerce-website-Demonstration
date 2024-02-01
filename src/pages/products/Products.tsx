import { useAllProductsQuery } from "@/services/productsApi";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Link } from "react-router-dom";
import useSearchStore from "@/services/searchContext";
// import SearchResult from "@/components/ui/SearchResult";

// import { ProductsLoading } from "@/components/ui/loadings/ProductListLoading";

export const Products = () => {
  const { isPending, error, data } = useAllProductsQuery();
  const { isSearchActive } = useSearchStore();

  const goBlur: string = "mt-8 blur ";
  console.log(isSearchActive, "asdasdasdas");

  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <MaxWidthWrapper className={isSearchActive ? goBlur : "mt-8"}>
      <div className="flex w-full flex-col gap-6">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {data.products.map((item: ProductData) => (
            <Link key={item.id} to={`/products/${item.id}`}>
              <ProductCard {...item} />
            </Link>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
