import { Link } from "react-router-dom";
import { Button } from "./button";
import { useQueryClient } from "@tanstack/react-query";
import { PRODUCTS_QUERY } from "@/utils/constants";

type PaginationProps = {
  previous: bigint;
  next: bigint;
  totalPage: number[];
  currentPage: number | string;
};

const Pagination = ({
  previous,
  next,
  totalPage,
  currentPage,
}: PaginationProps) => {
  const queryClient = useQueryClient();

  return (
    <div className="flex gap-2 border-border border-2 p-2 rounded-sm items-center justify-around w-min">
      <Link
        onClick={() =>
          queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY] })
        }
        to={`/products/page/${previous}`}
      >
        Previous
      </Link>
      {totalPage?.map((pageNumber) => (
        <Link key={pageNumber} to={`/products/page/${pageNumber}`}>
          <Button
            variant={
              Number(currentPage) !== pageNumber ? "secondary" : "default"
            }
          >
            {pageNumber}
          </Button>
        </Link>
      ))}
      <Link
        onClick={(e) =>
          queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY] })
        }
        to={`/products/page/${next}`}
        className={currentPage == totalPage?.length ? "cursor-not-allowed" : ""}
      >
        <Button
          variant={currentPage == totalPage?.length ? "secondary" : "default"}
          disabled={currentPage == totalPage?.length}
        >
          asd
        </Button>
      </Link>
    </div>
  );
};

export default Pagination;
