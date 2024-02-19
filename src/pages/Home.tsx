import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "@/components/ui/cards/ProductCard";
import { useAllProductsQuery } from "@/services/productsQuery";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { HomeCategories } from "@/components/ui/homePage custom/HomeCategories";

export default function Home() {
  const { isPending, error, data } = useAllProductsQuery();

  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <MaxWidthWrapper>
      <div className="border-x-2 border-border">
        <div className="flex w-full flex-col gap-6 py-8">
          {/* Best Offers */}
          <section className="flex flex-col gap-2">
            <div
              className={cn(
                buttonVariants({
                  className: "max-w-min bg-yellow-500",
                  variant: "secondary",
                })
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
                      <Card>
                        <CardContent className="flex flex-col gap-4 p-4">
                          <CardHeader className="flex flex-row items-center p-0 justify-between px-0">
                            <CardTitle className="line-clamp-1 text-center">
                              {t(item.title)}
                            </CardTitle>
                            <div className="flex bg-background rounded-md">
                              <Button className="rounded-e-none ">
                                {item.price - 40}$
                              </Button>
                              <Button className="rounded-s-none " disabled>
                                {item.price - 1}$
                              </Button>
                            </div>
                          </CardHeader>
                          <img
                            src={item.image}
                            alt={item.title}
                            className=" h-[100px] object-cover rounded-sm"
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
          <HomeCategories />
          {/* Homepage All products */}
          <section className="flex flex-col gap-2">
            <div
              className={cn(
                buttonVariants({
                  className: "max-w-min",
                  variant: "secondary",
                })
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
      </div>
    </MaxWidthWrapper>
  );
}
