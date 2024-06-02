import { Button } from "../button";
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
import InteractiveButton from "../InteractiveButton";
import HoverInfoElement from "../HoverInfoElement";
import { ProductsLoading } from "../loadings/ProductListLoading";
import { useQuery } from "@tanstack/react-query";
import { fetchSales } from "@/services/productsApi";
import { SALES_QUERY } from "@/utils/constants";
import { ErrorFetchingOffers } from "../ComponentErrors/ErrorFetchingProducts";

const HomeOffers: React.FC = () => {
  const {
    data: salesData,
    isLoading: salesPending,
    error: salesError,
  } = useQuery({
    queryKey: [SALES_QUERY, fetchSales],
    queryFn: fetchSales,
  });

  if (salesPending) return <ProductsLoading homePageOffers numberOfCards={4} />;
  if (salesError) return <ErrorFetchingOffers />;

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
            {salesData.products?.map((item: ProductData) => (
              <CarouselItem
                key={item.id}
                className="min-[375px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div>
                  <div className="rounded-md bg-card">
                    <div className="flex flex-col gap-4 rounded-md border-2 border-border p-2 lg:p-4">
                      <div className="flex flex-row items-center justify-between rounded-lg bg-background">
                        <CardTitle className="line-clamp-1 justify-center px-3 text-center max-[440px]:hidden">
                          {t(item.title)}
                        </CardTitle>
                        <div className="flex">
                          <InteractiveButton
                            title={`${item.price}$`}
                            wrapperClass="rounded-none w-full"
                            buttonVariant="default"
                            buttonClass=" lg:p-2 rounded-r-none"
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
                              className="w-full rounded-s-none border-2 border-border line-through md:p-2"
                              disabled
                            >
                              {item.price - 1}$
                            </Button>
                          </HoverInfoElement>
                        </div>
                      </div>
                      <Link
                        className="w-full"
                        to={`/product/productName/${item.title}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-[100px] w-full rounded-sm object-cover"
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
