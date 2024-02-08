import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useCategoriesQuery } from "@/services/productsQuery";
import { Link, Outlet, useParams } from "react-router-dom";

// ... (import statements remain unchanged)

export default function Categories() {
  const { data: categories, isLoading } = useCategoriesQuery();
  const { id } = useParams();

  if (isLoading) return <MaxWidthWrapper>testing</MaxWidthWrapper>;

  return (
    <MaxWidthWrapper className="mt-8">
      <section className="w-full flex justify-between">
        {isLoading && <div>testing</div>}
        {categories.map((category: CategoriesProps) => (
          <Link to={`/products/categories/${category.name}`} key={category.id}>
            <Button variant={category.name === id ? "default" : "secondary"}>
              {category.name}
            </Button>
          </Link>
        ))}
      </section>
      <Outlet />
    </MaxWidthWrapper>
  );
}
