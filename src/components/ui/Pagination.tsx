import { useNavigate } from "react-router-dom";
import { Button } from "./button";

type PaginationProps = {
  previous: string | number | bigint;
  next: string | number | bigint;
  totalPage: number[];
  currentPage: number | string;
  isFetching: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  previous,
  next,
  totalPage,
  currentPage,
  isFetching,
}) => {

  const navigate = useNavigate();
  return (
    <div className="flex gap-2 border-border border-2 p-2 rounded-lg items-center justify-around w-min mb-10 mt-20">
      <Button
        variant={currentPage == 1 ? "secondary" : "default"}
        disabled={currentPage == 1 || isFetching}
        className="rounded-r-none"
        onClick={() => {
          navigate(`/products/page/${previous}`);
        }}
      >
        Previous
      </Button>
      {totalPage?.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => navigate(`/products/page/${pageNumber}`)}
          variant={Number(currentPage) !== pageNumber ? "secondary" : "default"}
          className="rounded-none"
          disabled={isFetching}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        variant={currentPage == totalPage?.length ? "secondary" : "default"}
        disabled={currentPage == totalPage?.length || isFetching}
        className="rounded-l-none"
        onClick={() => {
         navigate(`/products/page/${String(next)}`);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
