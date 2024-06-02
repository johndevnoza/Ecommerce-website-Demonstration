import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import InteractiveButton from "../InteractiveButton";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { addToCart, removeFromCart } from "@/services/useCartsQuery";
import {
  FolderHeart,
  MessageCircleMore,
  MessagesSquare,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorites, removeFromFavorites } from "@/services/FavoritesQuery";
import { useNavigate } from "react-router-dom";
import { CARTS_QUERY, FAVORITES_QUERY } from "@/utils/constants";

export default function ProductDetails({
  image,
  title,
  description,
  price,
  created_at,
  updated_at,
  id,
  isInCart,
  isInFavorites,
  isPageShopping,
  isPageFavorites,
  secondId,
}: ProductData) {
  const queryClient = useQueryClient();
  const handleAddToCart = useMutation({
    mutationFn: async (item: string) => addToCart(item),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [CARTS_QUERY] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (item: string) => removeFromCart(item),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CARTS_QUERY] });
    },
  });
  const handleAddToFavorites = useMutation({
    mutationFn: async (item: string) => addToFavorites(item),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [FAVORITES_QUERY] });
    },
  });
  const HandleRemoveFavorites = useMutation({
    mutationFn: async (item: string) => removeFromFavorites(item),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [FAVORITES_QUERY] });
    },
  });
  const navigate = useNavigate();

  return (
    <MaxWidthWrapper className="mb-44 mt-10 flex justify-between rounded-md border-none">
      <div className="flex-grow-1 hover:flex-grow-2 group flex w-[350px] flex-col gap-1 rounded-l-md border-2 border-border bg-card p-4 transition-all duration-300 hover:scale-110 hover:rounded-sm hover:outline hover:outline-border md:w-[450px] md:hover:w-full md:hover:translate-x-[-16px]">
        <img
          src={image}
          alt={title}
          className={twMerge(
            "h-[350px] rounded-md object-cover object-center group-hover:w-[600px]",
          )}
        />
        <div className="flex flex-col justify-between text-neutral-500">
          <div className="flex justify-around">
            <p>Created at:</p>
            <p>{created_at ? created_at.substring(0, 10) : "N/A"}</p>
          </div>
          <div className="flex justify-around">
            <p>Updated at:</p>
            <p>{updated_at ? updated_at.substring(0, 10) : "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="min-w-1 bg-background lg:w-2"></div>
      <CardHeader className="group w-full flex-grow-0 gap-2 border-2 border-border bg-card p-4 transition-all duration-300 hover:scale-110 hover:rounded-sm hover:outline hover:outline-border">
        <CardTitle className="min-w-0 p-0">{title}</CardTitle>
        <CardDescription className="line-clamp-6 max-w-max transition-all group-hover:mt-2 group-hover:line-clamp-none">
          {description}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga harum,
          laborum neque deleniti placeat blanditiis, similique corporis fugit
          dolores suscipit possimus distinctio? Fugit eaque at, neque culpa
          possimus saepe dignissimos, voluptates consequatur, dolorem
          consequuntur odit id doloremque perspiciatis nam sunt!
        </CardDescription>
      </CardHeader>
      <div className="min-w-1 bg-background lg:w-2"></div>
      <CardFooter className="flex flex-col justify-around rounded-r-md border-2 border-border bg-card p-4 transition-all duration-300 hover:scale-110 hover:rounded-sm hover:outline hover:outline-border">
        <div className="flex w-full flex-col items-center justify-between rounded-md">
          <InteractiveButton
            buttonVariant="default"
            buttonClass="rounded-b-none hover:scale-95 p-3"
            title={`${price}$`}
            showInfo
            hoverContent="Buy now"
            redirect="/shopping"
          />

          <div className="h-1 w-full border-b-4 border-card"></div>
          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: "outline",
                className: isInFavorites
                  ? "rounded-none  w-full lg:p-2 grid group cursor-pointer bg-primary"
                  : "rounded-none w-full lg:p-2 grid group cursor-pointer ",
              }),
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
          <div className="h-1 w-full border-b-4 border-card"></div>
          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: "outline",
                className: isInCart
                  ? "rounded-none w-full lg:p-2  group cursor-pointer bg-primary"
                  : "rounded-none w-full lg:p-2  group cursor-pointer",
              }),
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
              <ShoppingCart className="animate-pulse" />
            ) : isPageShopping ? (
              <X />
            ) : (
              <ShoppingCart />
            )}
          </InteractiveButton>
          <div className="h-1 w-full border-b-4 border-card"></div>
          <InteractiveButton
            showInfo
            hoverContent="Feedback"
            icon
            iconClass={cn(
              buttonVariants({
                variant: "outline",
                className: "w-full  rounded-none hover:scale-95",
              }),
            )}
          >
            <MessagesSquare />
          </InteractiveButton>
          <div className="h-1 w-full border-b-4 border-card"></div>
          <InteractiveButton
            showInfo
            hoverContent="Raiting"
            icon
            iconClass={cn(
              buttonVariants({
                variant: "outline",
                className: "w-full  rounded-none hover:scale-95",
              }),
            )}
          >
            <Star className="w-full" />
          </InteractiveButton>
          <div className="h-1 w-full border-b-4 border-card"></div>
          <InteractiveButton
            showInfo
            hoverContent="Comments"
            icon
            iconClass={cn(
              buttonVariants({
                variant: "outline",
                className: "w-full  rounded-none hover:scale-95 rounded-b-md",
              }),
            )}
          >
            <MessageCircleMore />
          </InteractiveButton>
        </div>
      </CardFooter>
    </MaxWidthWrapper>
  );
}
