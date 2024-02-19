import { Link } from "react-router-dom";
import SearchCard from "./cards/SearchCard";
import { MouseEventHandler } from "react";

type SearchResultsProps = {
  searchUrl: string;
  searchingProducts: ProductData[];
  clearInput?: MouseEventHandler;
};
const SearchResults = ({
  searchUrl,
  searchingProducts,
  clearInput,
}: SearchResultsProps) => {
  return (
    <section className="z-20 absolute top-[108%] md:w-[500px]  w-[380px]">
      <div className="flex flex-col bg-secondary rounded-md gap-1 p-1">
        {searchUrl
          ? searchingProducts.map((product: ProductData) => (
              <Link
                className="w-full bg-card hover:bg-background/60 last:rounded-b-sm first:rounded-t-sm"
                key={product.id}
                to={`/products/${product.title}`}
                onClick={clearInput}
              >
                <SearchCard className="p-2" key={product.id} {...product} />
              </Link>
            ))
          : null}
      </div>
    </section>
  );
};

export default SearchResults;
