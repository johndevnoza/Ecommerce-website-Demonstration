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
// EXPERIMENTAL COMPONENT
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
          <div className="min-h-8 min-w-max animate-pulse rounded-md bg-secondary"></div>
          <div className="my-8 grid grid-cols-2 gap-x-6 gap-y-6 max-[440px]:grid-cols-1 max-[300px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-2">
            {cards}
          </div>
        </MaxWidthWrapper>
      )}
      {homePageProducts && (
        <div className="my-8">
          <div className="min-h-8 w-40 animate-pulse rounded-md bg-secondary p-2 text-center font-bold">
            Loading Products
          </div>
          <div className="my-8 grid grid-cols-2 gap-x-6 gap-y-6 max-[440px]:grid-cols-1 max-[300px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-2">
            {cards}
          </div>
        </div>
      )}
      {homePageOffers && (
        <div>
          <div className="min-h-10 w-36 animate-pulse rounded-lg bg-secondary py-2 text-center font-bold">
            Loading Offers
          </div>
          <div className="my-2 grid grid-cols-2 gap-x-6 gap-y-6 max-[375px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-2">
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
