import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useCategoriesQuery } from "@/services/productsQuery";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Categories() {
  const { data: categories, isPending, error } = useCategoriesQuery();
  const { categoryName } = useParams();

  if (isPending)
    return (
      <MaxWidthWrapper className="bg-secondary animate-pulse py-2 ">
        Loading Categories
      </MaxWidthWrapper>
    );
  if (error) return <div>Error Categories</div>;
  return (
    <MaxWidthWrapper className="mt-10 mb-44 ">
      <section className="w-full flex gap-4 p-2 flex-wrap border-border rounded-md border-2">
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
