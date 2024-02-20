import { buttonVariants } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { useAllProductsQuery } from "@/services/productsQuery";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const HomeProductsPreview: React.FC = () => {
  const { isPending, error, data } = useAllProductsQuery();
  if (isPending) return <div>testing</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
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
  );
};

export default HomeProductsPreview;
