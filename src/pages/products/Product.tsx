import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { useSingleProductQuery } from "@/services/productsQuery";

export default function Product({ productId }: any) {
  const { data: product } = useSingleProductQuery(productId);
  console.log(product);

  return <MaxWidthWrapper>Product</MaxWidthWrapper>;
}

//  function Post({ id }) {
//   const postQuery = useQuery({
//     queryKey: ["posts", id],
//     queryFn: () => getPost(id),
//   })
