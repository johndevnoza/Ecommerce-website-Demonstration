import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { FolderHeart, ShoppingCart } from "lucide-react";
import InteractiveButton from "../InteractiveButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/useCartsQuery.tsx";
import { addToFavorites } from "@/services/FavoritesStorage";
import { fetchAllProducts } from "@/services/productsApi";

const HomeProductsPreview: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
  });

  const handleAddToCart = useMutation({
    mutationFn: async (item: string) => addToCart(item),
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });

  const handleAddToFavorites = useMutation({
    mutationFn: async (item: ProductData) => addToFavorites(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Favorites"] });
    },
  });
  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="flex flex-col gap-2">
      <div>
        <InteractiveButton
          title={"All products"}
          buttonVariant="secondary"
          buttonClass="w-min"
          link
          redirect="/products"
          showInfo
          hoverSide="right"
          hoverContent="View all products in details"
          showDialog={false}
        />
      </div>
      <div className="grid md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-5  lg:gap-x-2 ">
        {data.products.map((item: ProductData) => (
          <div
            key={item.id}
            className="bg-card flex flex-col gap-2 rounded-md items-center p-2"
          >
            <Link to={`/products/product/${item.title}`}>
              <img
                className="w-max h-44  rounded-sm object-cover object-center"
                src={item.image}
                alt={item.title}
              />
            </Link>
            <span className="line-clamp-1 font-bold">{item.title}</span>
            <div className="flex justify-center items-center rounded-md w-full ">
              <InteractiveButton
                title={`${item.price}$`}
                wrapperClass="rounded-none "
                buttonVariant="outline"
                buttonClass="w-full  rounded-r-none w-full hover:scale-95"
                showInfo
                hoverSide="bottom"
                hoverContent="Buy now"
                redirect="/shopping"
              />

              <InteractiveButton
                wrapperClass={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "rounded-none w-full lg:p-2 grid group",
                  })
                )}
                iconClass="group-hover:scale-125 cursor-pointer"
                showInfo
                icon
                hoverSide="bottom"
                hoverContent="Add to Favorites"
                // @ts-ignore

                onClick={() => handleAddToFavorites.mutate(item)}
              >
                <FolderHeart />
              </InteractiveButton>
              <InteractiveButton
                wrapperClass={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "rounded-none w-full lg:p-2 rounded-r-md group",
                  })
                )}
                iconClass="group-hover:scale-125  cursor-pointer"
                showInfo
                icon
                hoverSide="bottom"
                hoverContent="Add to Cart"
                onClick={() => handleAddToCart.mutate(item.id)}
              >
                <ShoppingCart />
              </InteractiveButton>
              {/* <div
                onClick={() => {
                  removeFromCartMutation.mutate(item);
                }}
              >
                remove
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProductsPreview;
