import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, XCircle } from "lucide-react";
import React from "react";
type SearchComponent = {
  favoritesTerm: string;
  setFavoritesTerm: (value: string) => void;
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
};
const SearchInComponent = ({
  favoritesTerm,
  setFavoritesTerm,
  handleSearchTermChange,
  isPending,
}: SearchComponent) => {
  
  return (
    <header className="flex justify-between items-center gap-4  border-border border-2 p-2  rounded-md">
      <Button className="" variant={"secondary"}>
        Favorited
      </Button>
      <div className="relative">
        <Input
          type="text "
          value={favoritesTerm}
          onChange={handleSearchTermChange}
          placeholder="Search favorited"
          className=""
        />
        {favoritesTerm && (
          <XCircle
            onClick={() => setFavoritesTerm("")}
            className="absolute top-2 z-40 right-1 hover:scale-110 animate-pulse"
          />
        )}
        {isPending ? (
          <Loader2 className="absolute right-8 top-2 animate-spin" />
        ) : null}
      </div>
    </header>
  );
};

export default SearchInComponent;
