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
import InteractiveButton from "../InteractiveButton";
import HoverInfoElement from "../HoverInfoElement";

const HomeOffers: React.FC = () => {
  const { data, isPending, error } = useAllProductsQuery();
  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <section className="flex flex-col gap-2">
        <div>
          <InteractiveButton
            title={"Best Offers"}
            buttonVariant="default"
            buttonClass="w-min"
            link
            redirect="/sales"
            showInfo
            hoverSide="right"
            hoverContent="Click to see available offers"
            showDialog={false}
          />
        </div>
        <Carousel>
          <CarouselContent>
            {data.products.map((item: ProductData) => (
              <CarouselItem
                key={item.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 "
              >
                <div>
                  <div className="bg-card rounded-md">
                    <div className="flex flex-col gap-4 p-2 lg:p-4">
                      <div className="flex flex-row items-center justify-between bg-background rounded-lg ">
                        <CardTitle className="line-clamp-1 text-center justify-center px-3">
                          {t(item.title)}
                        </CardTitle>
                        <div className="flex">
                          <InteractiveButton
                            title={`${item.price - 40}$`}
                            wrapperClass="rounded-none "
                            buttonVariant="default"
                            buttonClass="w-full lg:p-2 rounded-r-none w-full"
                            showInfo
                            hoverSide="bottom"
                            hoverContent="Buy now"
                            redirect="/shopping"
                          />
                          <HoverInfoElement
                            shouldHover
                            hoverContent="Old price"
                            side="bottom"
                          >
                            <Button
                              variant={"ghost"}
                              className="rounded-s-none md:p-2"
                              disabled
                            >
                              {item.price - 1}$
                            </Button>
                          </HoverInfoElement>
                        </div>
                      </div>
                      <Link
                        className="w-full"
                        to={`/products/product/${item.title}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className=" h-[100px] w-full object-cover rounded-sm"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
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
