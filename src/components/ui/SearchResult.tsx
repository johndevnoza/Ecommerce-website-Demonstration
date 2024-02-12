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
    <section className="z-20 absolute top-full w-full">
      <div className="flex flex-col bg-secondary rounded-md w-full">
        {searchUrl
          ? searchingProducts.map((product: ProductData) => (
              <Link
                className="w-full py-1"
                key={product.id}
                to={`/products/${product.title}`}
                onClick={clearInput}
              >
                <SearchCard key={product.id} {...product} />
              </Link>
            ))
          : null}
      </div>
    </section>
  );
};

export default SearchResults;
