import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
// EXPERIMENTAL COMPONENT

type FilterProps = {
  foundItems: number;
  maxPrice: string;
  minPrice: string;
  setMaxPrice: (value: string) => void;
  setMinPrice: (value: string) => void;
  handleReset: () => void;
  handleFilterClick: () => void;
};

const FilterComponent = ({
  foundItems,
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
  handleReset,
  handleFilterClick,
}: FilterProps) => {
  return (
    <div className="border-border border-2 rounded-md flex flex-col p-2 mt-4 justify-evenly">
      {foundItems > 0 ? (
        <span className="font-bold ">Found {foundItems} items</span>
      ) : (
        <span className="font-bold ">No items found</span>
      )}
      <DropdownMenuSeparator />
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1 max-[565px]:flex-col">
          <Input
            type="number"
            className="bg-secondary w-min"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
          />
          <Input
            type="number"
            className="bg-secondary w-min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min price"
          />
        </div>
        <div className="flex max-[565px]:flex-col">
          <Button
            variant="secondary"
            onClick={handleReset}
            className="max-[440px]:order-1"
          >
            Reset
          </Button>
          <Button
            onClick={handleFilterClick}
            className="justify-end text-justify"
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
