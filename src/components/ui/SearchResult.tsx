import { Link } from "react-router-dom";
import SearchCard from "./cards/SearchCard";
import { MouseEventHandler } from "react";

type SearchResultsProps = {
  searchUrl: string;
  searchingProducts: ProductData[];
  clearInput?: MouseEventHandler;
  isResult?: boolean;
  isLoading?: boolean;
};

const SearchResults = ({
  searchUrl,
  searchingProducts,
  clearInput,
  isResult,
  isLoading,
}: SearchResultsProps) => {
  return (
    <section className="absolute top-[108%] z-20 w-[280px] md:w-[70%]">
      {searchUrl && !isLoading && searchingProducts?.length > 0 ? (
        <div className="flex flex-col gap-1 rounded-md bg-secondary p-1">
          {searchingProducts.map((product: ProductData) => (
            <Link
              className="w-full bg-card first:rounded-t-sm last:rounded-b-sm hover:bg-background/60"
              key={product.id}
              to={`/product/productName/${product.title}`}
              onClick={clearInput}
            >
              <SearchCard className="p-2" {...product} />
            </Link>
          ))}
        </div>
      ) : searchUrl && !isResult && !isLoading ? (
        <div className="rounded-md bg-destructive p-2 text-center">
          No results
        </div>
      ) : searchUrl && isLoading ? (
        <div className="animate-pulse rounded-md bg-secondary p-2 text-center">
          Loading...
        </div>
      ) : null}
    </section>
  );
};

export default SearchResults;
