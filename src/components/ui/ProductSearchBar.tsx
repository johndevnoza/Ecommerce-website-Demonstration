import { useCallback } from "react";
import { XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductSearch } from "@/services/productsApi";
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
  const { data, isLoading } = useQuery({
    queryKey: ["productSearch", debauncedSearch],
    queryFn: () => fetchProductSearch(searchTerm),
  });
  const products: ProductData[] = data?.products || [];
  console.log(searchTerm, "searchterm");

  const [isSearching, setIsSearching] = useState(false);
  const handleBlur = () => {
    setIsSearching(false);
  };
  const handleFocus = () => {
    setIsSearching(true);
  };
  console.log(isLoading, "isloadingasd");

  return (
    <div className="w-full grid place-items-center relative">
      {/* focusing search input */}
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
      <SearchResults
        clearInput={() => setSearchTerm("")}
        searchingProducts={products}
        searchUrl={debauncedSearch}
      />
    </div>
  );
};

export default ProductSearchBar;
