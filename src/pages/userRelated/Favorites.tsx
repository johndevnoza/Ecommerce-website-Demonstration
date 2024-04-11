import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductCard from "@/components/ui/cards/ProductCard";
import { favoritesQuery } from "@/services/FavoritesStorage";

const Favorites = () => {
  const { data, isLoading, isError, error, isPending } = favoritesQuery();
  console.log(data, "Favorites");

  // const handleRemoveFavorites = useMutation({
  //   mutationFn: async (item: ProductData) => removeFromFavorites(item),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries();
  //     console.log("succes");
  //   },
  // });
  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <MaxWidthWrapper>
      <div className="flex w-full flex-col gap-6">
        <header>
          <h1 className="text-2xl">FAVORITES </h1>
          <div>Total Favorited items: {data.length}</div>
        </header>
        <span className="self-center animate-pulse text-primary">
          PRODUCTION IN PROGRESS
        </span>
        <div className="grid md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2">
          {data?.map((f: LikedProduct) => (
            <div key={f.id}>
              <ProductCard
                link={`/product/productName/${f.likedProduct.title}`}
                title={f.likedProduct.title}
                price={f.likedProduct.price}
                description={f.likedProduct.description}
                image={f.likedProduct.image}
                id={f.id}
                secondId={f.likedProduct.id}
                category_name={f.likedProduct.category_name}
                isInFavorites
              />
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Favorites;
