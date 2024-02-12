import { fetchSingleCategory } from "@/services/productsApi";
import { useQuery } from "@tanstack/react-query";

const Category = ({ categoryId }: any) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchSingleCategory(categoryId),
  });
  console.log(data);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      {data.products && (
        <div>
          {data.products.map((i: any) => (
            <div key={i.id}>{i.title}</div>
          ))}
        </div>
      )}
      <span>asdas</span>
    </div>
  );
};
export default Category;
