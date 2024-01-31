import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductCard({
  image,
  title,
  category,
  description,
  price,
}: ProductData) {
  return (
    <Card className="flex flex-wrap gap-4 flex-col  px-4 rounded-md pb-4">
      <CardHeader>
        <img
          src={image}
          alt={title}
          className="w-max object-cover h-[300px] object-center self-center"
        />
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <h3>{category}</h3>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant={
            typeof price === "number" && price < Number(15)
              ? "default"
              : "destructive"
          }
          className="w-full"
        >
          {price}$
        </Button>
      </CardFooter>
    </Card>
  );
}
