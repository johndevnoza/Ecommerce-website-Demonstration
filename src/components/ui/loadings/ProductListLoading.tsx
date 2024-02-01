// import { useAllProductsQuery } from "@/services/productsApi";
// import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

// export const ProductsLoading = () => {
//   const { data, error } = useAllProductsQuery();
//   if (error) return "An error has occurred: " + error.message;

//   return (
//     <MaxWidthWrapper className="mt-8">
//       <div className="flex w-full flex-col gap-6">
//         <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8">
//           {data.products.map((i: number) => (
//             <span key={i} title="asdas" />
//           ))}
//         </div>
//       </div>
//     </MaxWidthWrapper>
//   );
// };
