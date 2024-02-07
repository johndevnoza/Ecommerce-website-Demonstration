import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { buttonVariants } from "./button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAllProductsQuery } from "@/services/productsQuery";
import SearchResults from "./SearchResult";
import useSearchStore from "@/services/searchContext";

const ProductSearchBar = ({ isLoading }: any) => {
  const { data, isPending, error } = useAllProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const activateSearch = useSearchStore((state) => state.activateSearch);
  const deactivateSearch = useSearchStore((state) => state.deactivateSearch);

  const query = searchParams.get("q");
  useEffect(() => {
    if (query) {
      console.log("Activating search...");
      activateSearch();
      setSearchTerm(query);
      console.log("Search term:", query);
    } else {
      // console.log("Deactivating search...");
      deactivateSearch();
      console.log("No search term");
    }
  }, [activateSearch, deactivateSearch, query]);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  const products = data?.products || [];

  return (
    <div className="w-full grid place-items-center relative">
      <div className="flex w-full justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isLoading ? "Loading..." : ""}
          className={cn(
            buttonVariants({ variant: "outline", className: "w-[70%]" })
          )}
        />
      </div>
      {searchTerm && (
        <XCircle
          onClick={() => setSearchTerm("")}
          className="absolute right-[18%]"
        />
      )}
      <SearchResults products={products} searchQuery={searchTerm} />
    </div>
  );
};

export default ProductSearchBar;
