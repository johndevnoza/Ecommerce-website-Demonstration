import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import SearchResults from "@/components/ui/SearchResult";
import { buttonVariants } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useAllProductsQuery } from "@/services/productsApi";
import { Link } from "react-router-dom";

export default function Home() {
  // const [searchParams] = useSearchParams();
  // const searchTerm = searchParams.get("q");
  const { isPending, error, data } = useAllProductsQuery();
  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <MaxWidthWrapper className="mt-8">
      <div className={cn(buttonVariants())}>Best Offers</div>
      <div className="flex w-full flex-col gap-6">
        <Carousel>
          <CarouselContent>
            {data.products.map((item: ProductData) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <Link to={`/products/${item.id}`}>
                  <ProductCard {...item} />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* <SearchResults products={data.products} searchQuery={searchTerm} /> */}
    </MaxWidthWrapper>
  );
}
