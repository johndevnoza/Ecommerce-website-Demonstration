import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InteractiveButton from "../InteractiveButton";
import { FolderHeart, ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { addToCart } from "@/services/useCartsQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorites } from "@/services/FavoritesStorage";

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
}: ProductData) {
  const queryClient = useQueryClient();
  const handleAddToCart = useMutation({
    mutationFn: async (item: ProductData) => addToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleAddToFavorites = useMutation({
    mutationFn: async (item: ProductData) => addToFavorites(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return (
    <Card
      onClick={onClick}
      className="flex  flex-col rounded-md hover:bg-secondary/40 justify-between"
    >
      <Link to={`${link}`}>
        <CardHeader className="gap-1">
          <img
            src={image}
            alt={title}
            className={twMerge(
              " w-full object-cover h-[200px] object-center rounded-md self-center",
              imageStyle
            )}
          />
          <CardTitle className="line-clamp-1 px-3 ">{title}</CardTitle>
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
          <CardDescription className="line-clamp-2 px-3">
            {description}asdasdasdasdasd asdasd as as d
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
            redirect="/shopping"
          />
          <InteractiveButton
            wrapperClass={cn(
              buttonVariants({
                variant: "outline",
                className: "rounded-none w-full lg:p-2 grid group",
              })
            )}
            iconClass="group-hover:scale-125"
            showInfo
            icon
            hoverSide="bottom"
            hoverContent="Add to Favorites"
            onClick={() => handleAddToFavorites.mutate({ id })}
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
            iconClass="group-hover:scale-125"
            showInfo
            icon
            hoverSide="bottom"
            hoverContent="Add to Cart"
            onClick={() => handleAddToCart.mutate({ id })}
          >
            <ShoppingCart />
          </InteractiveButton>
        </div>
      </CardFooter>
    </Card>
  );
}
