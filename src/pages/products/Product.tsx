import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { fetchSingleProduct } from "@/services/productsApi";
import { useQuery } from "@tanstack/react-query";

export default function Product() {
  const { data, isPending, error } = useQuery({
    queryKey: ["productSearch"],
    queryFn: () => fetchSingleProduct(),
  });
  console.log(data);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <MaxWidthWrapper>
      {data.products.map((product: ProductData) => (
        <div key={product.id}>{product.title}</div>
      ))}
      <div>asdasdasd</div>
    </MaxWidthWrapper>
  );
}

//  function Post({ id }) {
//   const postQuery = useQuery({
//     queryKey: ["posts", id],
//     queryFn: () => getPost(id),
//   })
