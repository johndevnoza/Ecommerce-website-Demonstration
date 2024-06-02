import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCategoriesQuery } from "@/services/productsQuery";
import { Link } from "react-router-dom";
import { Button } from "../button";
import Autoplay from "embla-carousel-autoplay";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { ErrorFetchingCategories } from "../ComponentErrors/ErrorFetchingProducts";

function HomeCategories(): JSX.Element | string {
  const { data: categories, isPending, error } = useCategoriesQuery();

  if (isPending)
    return (
      <MaxWidthWrapper className="animate-pulse bg-secondary py-2">
        Loading Categories
      </MaxWidthWrapper>
    );
  if (error) return <ErrorFetchingCategories />;

  return (
    <Carousel
      opts={{
        align: "end",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="border bg-card text-card-foreground shadow-sm"
    >
      <CarouselContent className="">
        {categories.map((category: CategoriesProps) => (
          <CarouselItem
            key={category.id}
            className="basis-1/3 md:basis-1/3 lg:basis-1/5"
          >
            <Link to={`/product-category/${category.name}`}>
              <Button variant={"secondary"}>{category.name}</Button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
export default HomeCategories;
