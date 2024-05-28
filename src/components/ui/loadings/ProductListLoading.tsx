import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import {
  ProductsSkeleton,
  SmallProductsSkeleton,
} from "./CustomSkeletonLoadings";
type SkeletonLoadingProps = {
  numberOfCards: number;
  products?: boolean;
  cart?: boolean;
  shopping?: boolean;
  homePageOffers?: boolean;
  homePageProducts?: boolean;
  homePageCategories?: boolean;
};

// ProductsLoading.jsx

export const ProductsLoading = ({
  numberOfCards,
  products,
  homePageOffers,
  homePageProducts,
}: SkeletonLoadingProps) => {
  const cards = [];

  for (let i = 0; i < numberOfCards; i++) {
    cards.push(<ProductsSkeleton key={i} />);
  }

  return (
    <>
      {products && (
        <MaxWidthWrapper className="my-8">
          <div className="min-w-max min-h-8 bg-secondary animate-pulse rounded-md"></div>
          <div className="grid my-8 max-[440px]:grid-cols-1  md:grid-cols-3 max-[300px]:grid-cols-1 sm:grid-cols-2 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
            {cards}
          </div>
        </MaxWidthWrapper>
      )}
      {homePageProducts && (
        <div className="my-8">
          <div className="w-40 min-h-8 bg-secondary font-bold p-2 animate-pulse text-center rounded-md">
            Loading Products
          </div>
          <div className="grid my-8 max-[440px]:grid-cols-1  md:grid-cols-3 max-[300px]:grid-cols-1 sm:grid-cols-2 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
            {cards}
          </div>
        </div>
      )}
      {homePageOffers && (
        <div>
          <div className="w-36 min-h-10 bg-secondary animate-pulse text-center rounded-lg font-bold py-2">
            Loading Offers
          </div>
          <div className="grid my-2  md:grid-cols-3 max-[375px]:grid-cols-1 sm:grid-cols-2 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
            <SmallProductsSkeleton responsive="" />
            <SmallProductsSkeleton responsive="max-[375px]:hidden" />
            <SmallProductsSkeleton responsive="hidden md:block" />
            <SmallProductsSkeleton responsive="hidden lg:block" />
          </div>
        </div>
      )}
    </>
  );
};
