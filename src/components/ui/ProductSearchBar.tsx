import { LoaderIcon, XCircle } from "lucide-react";
import { fetchProductSearch } from "@/services/productsApi";
import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchResults from "./SearchResult";
import useDebounce from "@/hooks/useDebounce";

const ProductSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );
  const debauncedSearch = useDebounce(searchTerm);
  const { data, isFetching, isPending } = useQuery({
    queryKey: ["productSearch", debauncedSearch],
    queryFn: () => fetchProductSearch(debauncedSearch),
  });
  const products: ProductData[] = data?.products || null;

  const [isSearching, setIsSearching] = useState(false);
  const handleBlur = () => {
    setIsSearching(false);
    setTimeout(() => {
      setSearchTerm("");
    }, 300);
  };
  const handleFocus = () => {
    setIsSearching(true);
  };
  const isResult = !isFetching && !products;
  return (
    <div className="w-full grid place-items-center relative">
      {isSearching ? (
        <div className=" z-10 inset-0 bg-black/80 blur-lg fixed"></div>
      ) : null}
      <div className="flex w-full justify-center">
        <input
          type="text"
          className="w-[70%] z-40 flex h-10  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={searchTerm}
          onChange={handleSearchTermChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {searchTerm && (
        <XCircle
          onClick={() => setSearchTerm("")}
          className="absolute right-[18%] z-40 hover:scale-110 animate-pulse"
        />
      )}
      {searchTerm ? (
        <SearchResults
          isResult={isResult}
          clearInput={() => setSearchTerm("")}
          searchingProducts={products}
          searchUrl={debauncedSearch}
          isLoading={isFetching}
        />
      ) : null}
    </div>
  );
};

export default ProductSearchBar;
