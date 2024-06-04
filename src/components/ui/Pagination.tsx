import { useNavigate } from "react-router-dom";
import { Button } from "./button";

type PaginationProps = {
  previous: string | number | bigint;
  next: string | number | bigint;
  totalPage: number[];
  currentPage: number | string;
  isFetching: boolean;
  isHomePage: boolean
};

const Pagination: React.FC<PaginationProps> = ({
  previous,
  next,
  totalPage,
  currentPage,
  isFetching,
  isHomePage,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {!isHomePage ? (
        <div className="mb-10 mt-20 flex w-min items-center justify-around gap-2 rounded-lg border-2 border-border p-2">
          <Button
            variant={currentPage == 1 ? "secondary" : "default"}
            disabled={currentPage == 1 || isFetching}
            className="rounded-sm rounded-r-none"
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
              variant={
                Number(currentPage) !== pageNumber ? "secondary" : "default"
              }
              className="rounded-none"
              disabled={isFetching}
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            variant={currentPage == totalPage?.length ? "secondary" : "default"}
            disabled={currentPage == totalPage?.length || isFetching}
            className="rounded-sm rounded-l-none"
            onClick={() => {
              navigate(`/products/page/${String(next)}`);
            }}
          >
            Next
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
