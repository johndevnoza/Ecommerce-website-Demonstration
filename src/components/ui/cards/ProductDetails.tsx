import {
  Card,
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
import { addToFavorites, removeFromFavorites } from "@/services/FavoritesStorage";
import { useNavigate } from "react-router-dom";

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
    onSuccess: () => {
      queryClient.refetchQueries();
    },
  });
  const handleAddToFavorites = useMutation({
    mutationFn: async (item: string) => addToFavorites(item),
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
  const HandleRemoveFavorites = useMutation({
    mutationFn: async (item: string) => removeFromFavorites(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const navigate = useNavigate();

  return (
    <MaxWidthWrapper className="flex  rounded-md justify-between mt-10 mb-44 border-none">
      <div className="md:w-[450px] w-[350px] flex-grow-1 md:hover:w-full group rounded-l-md bg-card hover:rounded-sm flex flex-col gap-1  p-4 hover:outline-border hover:outline hover:scale-110 hover:flex-grow-2 md:hover:translate-x-[-16px] transition-all duration-300">
        <img
          src={image}
          alt={title}
          className={twMerge(
            " object-cover h-[350px] group-hover:w-[600px] object-center rounded-md "
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
      <div className="bg-background min-w-1 lg:w-2"></div>
      <CardHeader className="gap-2 p-4 w-full hover:rounded-sm flex-grow-0  group bg-card hover:outline-border hover:outline hover:scale-110 transition-all duration-300">
        <CardTitle className="p-0 min-w-0 ">{title}</CardTitle>
        <CardDescription className="line-clamp-6 max-w-max group-hover:line-clamp-none group-hover:mt-2 transition-all">
          {description}
          sadasdasd asd adas dasd asd asd asdad asd asd asd asd asd asd as asd
          asdasd asd asd asd asdad asd asd asd asd asd asd as asd asdasd asd asd
          asd asdad asd asd asd asd asd asd as asd asdasd asd
        </CardDescription>
      </CardHeader>
      <div className="bg-background min-w-1 lg:w-2"></div>
      <CardFooter className="p-4 rounded-r-md hover:rounded-sm flex flex-col justify-around bg-card hover:outline-border hover:outline hover:scale-110 transition-all duration-300">
        <div className=" flex flex-col w-full  rounded-md items-center justify-between ">
          <InteractiveButton
            buttonVariant="default"
            buttonClass="rounded-b-none hover:scale-95 p-3"
            title={`${price}$`}
            showInfo
            hoverContent="Buy now"
            redirect="/shopping"
          />

          <div className=" border-b-4 border-card h-1 w-full"></div>
          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: "outline",
                className: isInFavorites
                  ? "rounded-none  w-full lg:p-2 grid group cursor-pointer bg-primary"
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
          <div className=" border-b-4 border-card h-1 w-full"></div>
          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: "outline",
                className: isInCart
                  ? "rounded-none w-full lg:p-2  group cursor-pointer bg-primary"
                  : "rounded-none w-full lg:p-2  group cursor-pointer",
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
          <div className=" border-b-4 border-card h-1 w-full"></div>
          <InteractiveButton
            showInfo
            hoverContent="Feedback"
            icon
            iconClass={cn(
              buttonVariants({
                variant: "outline",
                className: "w-full  rounded-none hover:scale-95",
              })
            )}
          >
            <MessagesSquare />
          </InteractiveButton>
          <div className=" border-b-4 border-card h-1 w-full"></div>
          <InteractiveButton
            showInfo
            hoverContent="Raiting"
            icon
            iconClass={cn(
              buttonVariants({
                variant: "outline",
                className: "w-full  rounded-none hover:scale-95",
              })
            )}
          >
            <Star className="w-full" />
          </InteractiveButton>
          <div className=" border-b-4 border-card h-1 w-full"></div>
          <InteractiveButton
            showInfo
            hoverContent="Comments"
            icon
            iconClass={cn(
              buttonVariants({
                variant: "outline",
                className: "w-full  rounded-none hover:scale-95 rounded-b-md",
              })
            )}
          >
            <MessageCircleMore />
          </InteractiveButton>
        </div>
      </CardFooter>
      <div></div>
    </MaxWidthWrapper>
  );
}
