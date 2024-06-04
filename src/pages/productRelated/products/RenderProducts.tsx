import ProductCard from "@/components/ui/cards/ProductCard";

type RenderProductsProps<T extends ProductDataUnion> = {
  data: T[];
  isLoading: boolean;
  isInCart: string[];
  isInFavorites: string[];
  productCountMap: Map<string, number>;
  isPageFavorites?: boolean;
  secondId: string;
};

const RenderProducts = <T extends ProductDataUnion>({
  data,
  isLoading,
  isInCart = [],
  isInFavorites = [],
  productCountMap,
  isPageFavorites,
  secondId,
}: RenderProductsProps<T>) => {
  console.log(secondId);

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-[440px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-2">
      {data?.map((item: T) => (
        <ProductCard
          key={item.id}
          link={`/product/productName/${item.title}`}
          {...item}
          secondId={secondId}
          id={item.id}
          isLoading={isLoading}
          total={productCountMap.get(item.id) || null}
          isInCart={isInCart.includes(item.id)}
          isInFavorites={isInFavorites.includes(item.id)}
          isPageFavorites={isPageFavorites}
        />
      ))}
    </div>
  );
};

export default RenderProducts;
