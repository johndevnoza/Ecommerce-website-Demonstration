import { Card, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo } from "react";

function SearchCard({ image, title, price }: ProductData) {
  return (
    <Card
      className={cn(
        buttonVariants({
          variant: "ghost",
          className:
            "flex gap-2 justify-between items-center py-4 overflow-hidden",
        })
      )}
    >
      <img
        src={image}
        alt={title}
        className="object-cover  w-[50px] object-center self-center"
      />
      <CardTitle className="line-clamp-1 py-2">{title}</CardTitle>
      <Button
        variant={
          typeof price === "number" && price < Number(15)
            ? "default"
            : "destructive"
        }
        size={"sm"}
      >
        {price}$
      </Button>
    </Card>
  );
}

export default memo(SearchCard);