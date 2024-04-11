import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductDetails from "@/components/ui/cards/ProductDetails";
import { fetchProductSearch, fetchSingle } from "@/services/productsApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id }: any = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["single Product", id],
    queryFn: () => fetchSingle(id),
  });
  console.log(data, " one Product");

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <MaxWidthWrapper>
      {data.products.map((product: ProductData) => (
        <ProductDetails  {...product} key={product.id}  />
      ))}
    </MaxWidthWrapper>
  );
}
