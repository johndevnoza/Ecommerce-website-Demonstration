import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useCategoriesQuery } from "@/services/productsQuery";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Categories() {
  const { data: categories, isPending, error } = useCategoriesQuery();
  const { categoryName } = useParams();

  if (isPending)
    return (
      <MaxWidthWrapper className="animate-pulse bg-secondary py-2">
        Loading Categories
      </MaxWidthWrapper>
    );
  if (error) return <MaxWidthWrapper>Error Categories</MaxWidthWrapper>;
  return (
    <MaxWidthWrapper className="mb-44 mt-10">
      <section className="flex w-full flex-wrap gap-4 rounded-md border-2 border-border p-2">
        {categories.map((category: CategoriesProps) => (
          <Link to={`/product-category/${category.name}`} key={category.id}>
            <Button
              variant={category.name === categoryName ? "default" : "secondary"}
            >
              {category.name}
            </Button>
          </Link>
        ))}
      </section>
      <Outlet />
    </MaxWidthWrapper>
  );
}
