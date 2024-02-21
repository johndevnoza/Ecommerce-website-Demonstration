import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { CardTitle } from "../card";
import { useAllProductsQuery } from "@/services/productsQuery";

const HomeOffers: React.FC = () => {
  const { data, isPending, error } = useAllProductsQuery();
  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
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
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 "
              >
                <Link to={`/products/${item.id}`}>
                  <div className="bg-card rounded-md">
                    <div className="flex flex-col gap-4 p-2 lg:p-4">
                      <div className="flex flex-row items-center justify-between bg-background rounded-lg ">
                        <CardTitle className="line-clamp-1 text-center justify-center px-3">
                          {t(item.title)}
                        </CardTitle>
                        <div className="flex">
                          <Button className="rounded-e-none md:p-2">
                            {item.price - 40}$
                          </Button>
                          <Button
                            variant={"ghost"}
                            className="rounded-s-none md:p-2"
                            disabled
                          >
                            {item.price - 1}$
                          </Button>
                        </div>
                      </div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className=" h-[100px] object-cover rounded-sm"
                      />
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};
export default HomeOffers;
