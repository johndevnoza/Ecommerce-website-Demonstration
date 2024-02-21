import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductCard({
  image,
  title,
  category,
  description,
  price,
  imageStyle,
}: ProductData) {
  return (
    <Card className="flex h-96 flex-col rounded-md justify-between">
      <CardHeader className="gap-1">
        <img
          src={image}
          alt={title}
          className={twMerge(
            "w-max object-cover h-[200px] object-center rounded-md self-center",
            imageStyle
          )}
        />
        <CardTitle className="line-clamp-1 p-0">{title}</CardTitle>
        <h3>{category}</h3>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-1">
        <div className="bg-background flex w-full rounded-md items-center justify-between ">
          <Button variant={"ghost"} className="w-max">
            {price}$
          </Button>
          <div className={cn(buttonVariants({ variant: "ghost" }))}>
            <Star />
          </div>
          <div className={cn(buttonVariants({ variant: "ghost" }))}>
            <ShoppingCart />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
