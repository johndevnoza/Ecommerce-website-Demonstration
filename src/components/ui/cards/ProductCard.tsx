import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InteractiveButton from "../InteractiveButton";
import { FolderHeart, ShoppingCart, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "@/services/useCartsQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/services/FavoritesStorage";

export default function ProductCard({
  image,
  title,
  category_name,
  description,
  price,
  imageStyle,
  onClick,
  link,
  id,
  secondId,
  isInFavorites,
  isInCart,
  showElement = true,
  isPageShopping = false,
  isPageFavorites = false,
}: ProductData) {
  const queryClient = useQueryClient();
  const handleAddToCart = useMutation({
    mutationFn: async (item: string) => addToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const removeFromCartMutation = useMutation({
    mutationFn: async (item: string) => removeFromCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const handleAddToFavorites = useMutation({
    mutationFn: async (item: string) => addToFavorites(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const HandleRemoveFavorites = useMutation({
    mutationFn: async (item: string) => removeFromFavorites(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const navigate = useNavigate();

  return (
    <Card
      onClick={onClick}
      className="flex  flex-col rounded-md hover:bg-secondary/40 justify-between"
    >
      <Link to={`${link}`} className="">
        <CardHeader className="gap-1 ">
          <img
            src={image}
            alt={title}
            className={twMerge(
              " w-full object-cover h-[200px] object-center rounded-md self-center",
              imageStyle
            )}
          />
          <CardTitle className="line-clamp-1 px-3 ">{title}</CardTitle>
          {showElement ? (
            <InteractiveButton
              title={category_name}
              buttonVariant="ghost"
              buttonClass=" lg:p-2 hover:scale-95"
              showInfo
              hoverSide="bottom"
              hoverContent={`Go to ${category_name}`}
              redirect={`/product-category/${category_name}`}
              showDialog={false}
              link
            />
          ) : null}

          <CardDescription className="line-clamp-1 px-3">
            {description}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="p-1 grid px-3">
        <div className="bg-background flex  rounded-md items-center justify-between ">
          <InteractiveButton
            title={`${price}$`}
            wrapperClass="rounded-none "
            buttonVariant="outline"
            buttonClass="w-full lg:p-2 rounded-r-none w-full hover:scale-95"
            showInfo
            hoverSide="bottom"
            hoverContent="Buy now"
            redirect={"/shopping"}
          />
          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: "outline",
                className: isInFavorites
                  ? "rounded-none w-full lg:p-2 grid group cursor-pointer bg-primary"
                  : "rounded-none w-full lg:p-2 grid group cursor-pointer ",
              })
            )}
            iconClass="group-hover:scale-125"
            showInfo
            icon
            hoverSide="bottom"
            hoverContent={
              isInFavorites
                ? "Go to Favorites"
                : isPageFavorites
                ? "Remove favorited"
                : "Add to Favorites"
            }
            onClick={
              isPageFavorites
                ? () => HandleRemoveFavorites.mutate(id)
                : isInFavorites
                ? () => navigate("/favorites")
                : () => handleAddToFavorites.mutate(id)
            }
          >
            {isInFavorites ? (
              <FolderHeart className="animate-bounce" />
            ) : isPageFavorites ? (
              <X />
            ) : (
              <FolderHeart />
            )}
          </InteractiveButton>
          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: "outline",
                className: isInCart
                  ? "rounded-none w-full lg:p-2 rounded-r-md group cursor-pointer bg-primary"
                  : "rounded-none w-full lg:p-2 rounded-r-md group cursor-pointer",
              })
            )}
            iconClass="group-hover:scale-125"
            showInfo
            icon
            hoverSide="bottom"
            hoverContent={
              isInCart
                ? "Go to Shopping"
                : isPageShopping
                ? "Remove from Cart"
                : "Add to Cart"
            }
            onClick={
              isPageShopping
                ? () => removeFromCartMutation.mutate(id)
                : isInCart
                ? () => navigate("/shopping")
                : () => handleAddToCart.mutate(secondId)
            }
          >
            {isInCart ? (
              <ShoppingCart className="animate-pulse " />
            ) : isPageShopping ? (
              <X />
            ) : (
              <ShoppingCart />
            )}
          </InteractiveButton>
        </div>
      </CardFooter>
    </Card>
  );
}
