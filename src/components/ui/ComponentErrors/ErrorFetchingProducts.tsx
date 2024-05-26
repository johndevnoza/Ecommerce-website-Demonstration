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
    <div className="w-full rounded-md border-destructive border-2">
      <div className="mb-2 font-bold text-center flex gap-2 justify-center">
        <Link
          to={"https://github.com/niko-cxvedadze/final-api"}
          className="flex flex-col md:flex-row justify-between w-full items-center"
        >
          <div className="p-2 rounded-sm bg-primary">
            Error Fetching Products
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex gap-2 text-2xl justify-center font-bold"
          >
            <span>Network Error, Dockerize Backend:</span>
            <LinkIcon />
          </Button>
        </Link>
      </div>
      <div className="grid max-[440px]:grid-cols-1  grid-cols-2 md:grid-cols-3 gap-y-6  gap-x-6 lg:grid-cols-4  lg:gap-x-2">
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
    <div className="w-full rounded-md border-destructive border-2">
      <div className="mb-2 font-bold text-center flex gap-2 justify-center">
        <Link
          to={"https://github.com/niko-cxvedadze/final-api"}
          className="flex flex-col md:flex-row justify-between w-full items-center"
        >
          <div className="p-2 rounded-sm bg-primary">Error Fetching Offers</div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex gap-2 text-2xl justify-center font-bold"
          >
            <span>Network Error, Dockerize Backend:</span>
            <LinkIcon />
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 w-full">
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
    <div className="w-full rounded-md border-destructive border-2">
      <div className="  font-bold text-center flex gap-2 justify-center">
        <Link
          to={"https://github.com/niko-cxvedadze/final-api"}
          className="flex flex-col md:flex-row justify-between w-full items-center"
        >
          <div className="p-2 rounded-sm bg-primary">Error Fetching Offers</div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex gap-2 text-2xl justify-center font-bold"
          >
            <span>Network Error, Dockerize Backend:</span>
            <LinkIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};
