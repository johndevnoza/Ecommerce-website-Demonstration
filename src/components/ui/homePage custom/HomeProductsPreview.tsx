import { Button, buttonVariants } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { useAllProductsQuery } from "@/services/productsQuery";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Ghost, ShoppingCart, Star } from "lucide-react";

const HomeProductsPreview: React.FC = () => {
  const { data, isPending, error } = useAllProductsQuery();
  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="flex flex-col gap-2">
      <Link
        to={"/products"}
        className={cn(
          buttonVariants({
            className: "max-w-min",
            variant: "secondary",
          })
        )}
      >
        All products
      </Link>
      <div className="grid md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-5  lg:gap-x-2 ">
        {data.products.map((item: ProductData) => (
          <Link key={item.id} to={`/products/product/${item.title}`}>
            <div className="bg-card flex flex-col gap-2 rounded-md items-center p-2">
              <img
                className="w-62 h-44 md:size-36 rounded-sm object-cover object-center"
                src={item.image}
                alt={item.title}
              />
              <span className="line-clamp-1 font-bold">{item.title}</span>
              <div className="flex bg-background justify-between rounded-md w-full">
                <Button
                  variant={"ghost"}
                  className="w-full border-r rounded-r-none lg:p-1"
                >
                  {item.price}$
                </Button>
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "w-full rounded-none lg:p-1",
                    })
                  )}
                >
                  <Star />
                </div>
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      className: "w-full border-l rounded-l-none lg:p-1",
                    })
                  )}
                >
                  <ShoppingCart />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeProductsPreview;
