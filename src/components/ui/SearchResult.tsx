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
    <section className="z-20 absolute top-[108%] md:w-[70%] w-[280px]">
      {searchUrl && !isLoading && searchingProducts?.length > 0 ? (
        <div className="flex flex-col bg-secondary rounded-md gap-1 p-1">
          {searchingProducts.map((product: ProductData) => (
            <Link
              className="w-full bg-card hover:bg-background/60 last:rounded-b-sm first:rounded-t-sm"
              key={product.id}
              to={`/product/productName/${product.title}`}
              onClick={clearInput}
            >
              <SearchCard className="p-2" {...product} />
            </Link>
          ))}
        </div>
      ) : searchUrl && isResult ? (
        <div className=" text-center bg-secondary  p-2 rounded-md">
          No results
        </div>
      ) : null}
      <div>
        {searchUrl && isLoading ? (
          <div className="animate-pulse text-center  bg-secondary p-2 rounded-md">
            Loading...
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SearchResults;
