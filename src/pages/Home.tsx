import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductCard from "@/components/ui/cards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useAllProductsQuery } from "@/services/productsQuery";
import { Link } from "react-router-dom";

export default function Home() {
  const { isPending, error, data } = useAllProductsQuery();
  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <MaxWidthWrapper className="mt-8">
      <div className="flex w-full flex-col gap-6">
        <section className="flex flex-col gap-2">
          <div
            className={cn(
              buttonVariants({ className: "max-w-min", variant: "secondary" })
            )}
          >
            Best Offers
          </div>
          <Carousel>
            <CarouselContent>
              {data.products.map((item: ProductData) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3 "
                >
                  <Link to={`/products/${item.id}`}>
                    <ProductCard
                      title={item.title}
                      price={item.price}
                      image={item.image}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <section className="flex flex-col gap-2">
          <div
            className={cn(
              buttonVariants({ className: "max-w-min", variant: "secondary" })
            )}
          >
            All products
          </div>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {data.products.map((item: ProductData) => (
              <Link key={item.id} to={`/products/${item.id}`}>
                <ProductCard {...item} />
              </Link>
            ))}
          </div>
        </section>
      </div>
      {/* <SearchResults products={data.products} searchQuery={searchTerm} /> */}
    </MaxWidthWrapper>
  );
}
