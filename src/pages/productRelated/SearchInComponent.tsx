import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, XCircle } from "lucide-react";
import React from "react";
type SearchComponent = {
  favoritesTerm: string;
  setFavoritesTerm: (value: string) => void;
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
  pageTitles: string;
  isHomePage?: boolean;
};
const SearchInComponent = ({
  favoritesTerm,
  setFavoritesTerm,
  handleSearchTermChange,
  isPending,
  isHomePage,
  pageTitles,
}: SearchComponent) => {
  return (
    <>
      {!isHomePage ? (
        <header className="flex items-center justify-between gap-4 rounded-md border-2 border-border p-2">
          <Button className="" variant={"secondary"}>
            {pageTitles}
          </Button>
          <div className="relative">
            <Input
              type="text "
              value={favoritesTerm}
              onChange={handleSearchTermChange}
              placeholder={"Search products"}
            />
            {favoritesTerm && (
              <XCircle
                onClick={() => setFavoritesTerm("")}
                className="absolute right-1 top-2 z-40 animate-pulse hover:scale-110"
              />
            )}
            {isPending ? (
              <Loader2 className="absolute right-8 top-2 animate-spin" />
            ) : null}
          </div>
        </header>
      ) : null}
    </>
  );
};

export default SearchInComponent;
