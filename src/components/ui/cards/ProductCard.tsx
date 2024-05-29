import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InteractiveButton from "../InteractiveButton";
import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  FolderHeart,
  Loader,
  ShoppingCart,
  X,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseFromCart,
  removeFromCart,
} from "@/services/useCartsQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorites, removeFromFavorites } from "@/services/FavoritesQuery";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";

export default function ProductCard({
  image,
  title,
  price,
  category_name,
  description,
  imageStyle,
  onClick,
  link,
  id,
  secondId,
  isInCart,
  isInFavorites,
  showElement = true,
  isPageShopping = false,
  isPageFavorites = false,
  removeCartItem = false,
  isLoading = false,
  total,
}: ProductData) {
  const queryClient = useQueryClient();

  const handleAddToCart = useMutation({
    mutationFn: async (item: string) => await addToCart(item),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CARTS_QUERY] });
    },
  });
  const handleDecreaseCart = useMutation({
    mutationFn: async (item: string) => await decreaseFromCart(item),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CARTS_QUERY] });
    },
  });
  const removeItem = useMutation({
    mutationFn: async (item: string) => await removeFromCart(item),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CARTS_QUERY] });
    },
  });
  const handleAddToFavorites = useMutation({
    mutationFn: async (item: string) => await addToFavorites(item),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FAVORITES_QUERY],
      });
    },
  });
  const HandleRemoveFavorites = useMutation({
    mutationFn: async (item: string) => await removeFromFavorites(item),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FAVORITES_QUERY],
      });
    },
  });
  const navigate = useNavigate();

  return (
    <Card
      onClick={onClick}
      className={
        isLoading
          ? "flex  flex-col rounded-md hover:bg-secondary/40 justify-between filter grayscale"
          : "flex  flex-col rounded-md hover:bg-secondary/40 justify-between "
      }
    >
      <CardHeader className="gap-1 ">
        <Link to={`${link}`}>
          <img
            src={image}
            alt={title}
            className={twMerge(
              " w-full object-cover h-[200px] object-center rounded-md self-center",
              imageStyle
            )}
          />
        </Link>
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
      <CardFooter className="p-1 grid px-3">
        <div className="bg-background flex  rounded-md items-center justify-between ">
          <InteractiveButton
            title={`${price}$`}
            wrapperClass="rounded-none "
            buttonVariant="outline"
            buttonClass="  rounded-r-none w-full hover:scale-95  max-[840px]:p-3"
            showInfo
            hoverSide="bottom"
            hoverContent="Buy now"
            redirect={"/shopping"}
          />

          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: isInFavorites ? "default" : "outline",
                className: isPageShopping
                  ? "rounded-none w-full lg:p-2 max-[840px]:p-3 grid group cursor-pointer grid items-center bg-bg"
                  : isInFavorites
                  ? "rounded-none w-full mr-[2px] lg:p-2 max-[840px]:p-3 grid group cursor-pointer bg-primary"
                  : "rounded-none w-full lg:p-2 grid group max-[840px]:p-3 cursor-pointer ",
              })
            )}
            iconClass="group-hover:scale-125"
            showInfo
            icon
            hoverSide="bottom"
            hoverContent={
              isPageShopping
                ? "Add"
                : isInFavorites
                ? "Go to Favorites"
                : isPageFavorites
                ? "Remove favorited"
                : "Add to Favorites"
            }
            onClick={
              isPageShopping
                ? () => handleAddToCart.mutate(secondId)
                : isPageFavorites
                ? () => HandleRemoveFavorites.mutate(id)
                : isInFavorites
                ? () => navigate("/favorites")
                : () => handleAddToFavorites.mutate(id)
            }
          >
            {isPageShopping ? (
              <ArrowBigUpDash />
            ) : isInFavorites ? (
              <FolderHeart className="animate-bounce" />
            ) : isPageFavorites ? (
              <X className="max-[840px]:text-" />
            ) : handleAddToFavorites.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <FolderHeart />
            )}
          </InteractiveButton>
          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: isInCart ? "default" : "outline",
                className: isInCart
                  ? "rounded-none w-full lg:p-2 relative rounded-r-md max-[840px]:p-3 group cursor-pointer bg-secondary"
                  : "rounded-none w-full lg:p-2 relative rounded-r-md max-[840px]:p-3 group cursor-pointer",
              })
            )}
            showInfo
            icon
            hoverSide="bottom"
            hoverContent={
              isInCart
                ? "Go to Shopping"
                : isPageShopping
                ? "Remove"
                : "Add to Cart"
            }
            onClick={
              isPageShopping
                ? () => handleDecreaseCart.mutate(id)
                : isInCart
                ? () => navigate("/shopping")
                : () => handleAddToCart.mutate(secondId)
            }
          >
            {isInCart ? (
              <ShoppingCart className="animate-pulse " />
            ) : isPageShopping ? (
              <ArrowBigDownDash />
            ) : handleAddToCart.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <ShoppingCart />
            )}
            {total && !isPageShopping ? (
              <div className="absolute -right-2 -top-2 rounded-md bg-primary font-mono tabular-nums px-2 font-bold outline outline-background">
                {total}
              </div>
            ) : null}
          </InteractiveButton>
          {removeCartItem ? (
            <X
              className={twMerge(
                "absolute top-2 left-2 bg-secondary rounded-md p-1 scale-125 hover:bg-primary cursor-pointer"
              )}
              onClick={() => removeItem.mutate(id)}
            />
          ) : null}
        </div>
      </CardFooter>
      <div className="absolute right-2 top-2 rounded-md bg-primary px-2 font-bold">
        {total}
      </div>
    </Card>
  );
}
