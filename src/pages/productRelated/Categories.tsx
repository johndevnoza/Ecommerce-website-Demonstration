import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useCategoriesQuery } from "@/services/productsQuery";
import { Link, Outlet, useParams } from "react-router-dom";

// ... (import statements remain unchanged)

export default function Categories() {
  const { data: categories, isLoading } = useCategoriesQuery();
  const { categoryName } = useParams();

  if (isLoading) return <MaxWidthWrapper>testing</MaxWidthWrapper>;

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
