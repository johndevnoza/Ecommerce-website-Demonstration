import { LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../button";
import {
  ProductsSkeleton,
  SmallProductsSkeleton,
} from "../loadings/CustomSkeletonLoadings";
// EXPERIMENTAL COMPONENT
export const ErrorFetchingProducts = () => {
  return (
    <div className="w-full rounded-md border-2 border-destructive">
      <div className="mb-2 flex justify-center gap-2 text-center font-bold">
        <Link
          to={"https://github.com/niko-cxvedadze/final-api"}
          className="flex w-full flex-col items-center justify-between md:flex-row"
        >
          <div className="rounded-sm bg-primary p-2">
            Error Fetching Products
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex justify-center gap-2 text-2xl font-bold"
          >
            <span>Network Error, Dockerize Backend:</span>
            <LinkIcon />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-[440px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-2">
        <ProductsSkeleton />
        <ProductsSkeleton />
        <ProductsSkeleton />
        <ProductsSkeleton />
      </div>
    </div>
  );
};
export const ErrorFetchingOffers = () => {
  return (
    <div className="w-full rounded-md border-2 border-destructive">
      <div className="mb-2 flex justify-center gap-2 text-center font-bold">
        <Link
          to={"https://github.com/niko-cxvedadze/final-api"}
          className="flex w-full flex-col items-center justify-between md:flex-row"
        >
          <div className="rounded-sm bg-primary p-2">Error Fetching Offers</div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex justify-center gap-2 text-2xl font-bold"
          >
            <span>Network Error, Dockerize Backend:</span>
            <LinkIcon />
          </Button>
        </Link>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <SmallProductsSkeleton responsive="w-[24%]" />
        <SmallProductsSkeleton responsive="max-[375px]:hidden w-[24%]" />
        <SmallProductsSkeleton responsive="hidden md:block w-[24%]" />
        <SmallProductsSkeleton responsive="hidden lg:block w-[24%]" />
      </div>
    </div>
  );
};
export const ErrorFetchingCategories = () => {
  return (
    <div className="w-full rounded-md border-2 border-destructive">
      <div className="flex justify-center gap-2 text-center font-bold">
        <Link
          to={"https://github.com/niko-cxvedadze/final-api"}
          className="flex w-full flex-col items-center justify-between md:flex-row"
        >
          <div className="rounded-sm bg-primary p-2">Error Fetching Offers</div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex justify-center gap-2 text-2xl font-bold"
          >
            <span>Network Error, Dockerize Backend:</span>
            <LinkIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};
