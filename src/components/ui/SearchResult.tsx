import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAllProductsQuery } from "@/services/productsApi";
import SearchCard from "./cards/SearchCard";
type SearchResultsProps = {
  products?: ProductData[] | undefined;
  searchQuery?: string | null;
};
const SearchResults = ({ searchQuery }: SearchResultsProps) => {
  const { data: allProducts } = useAllProductsQuery();

  const filteredProducts = searchQuery
    ? allProducts.products.filter((p: ProductData) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProducts.products;

  useEffect(() => {
    console.log("Live search with query:", searchQuery);
  }, [searchQuery]);

  return (
    <section className="z-10 absolute top-full w-full">
      <div className="flex flex-col bg-secondary rounded-md w-full">
        {searchQuery &&
          filteredProducts.map((product: ProductData) => (
            <Link
              className="w-full py-1"
              key={product.id}
              to={`/products/${product.id}`}
            >
              <SearchCard key={product.id} {...product} />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default SearchResults;
