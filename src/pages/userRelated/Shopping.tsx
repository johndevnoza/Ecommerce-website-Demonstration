import PaymentForm from "@/components/form/CreditCardForm";
import CreditCardForm from "@/components/form/CreditCardForm";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { fetchCarts } from "@/services/useCartsQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Shopping = () => {
  const {
    data: cartProduct,
    isLoading,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCarts,
  });
  const isAdded = cartProduct
    ? cartProduct.map((item) => item.product_id)
    : null;
  const itemCount = cartProduct ? cartProduct.length : 0;
  const totalPrice = cartProduct
    ? cartProduct.reduce(
        (acc, item) => acc + item.count * item.cartProduct.price,
        0
      )
    : 0;

  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MaxWidthWrapper className="mt-10 mb-44 ">
      <div className=" flex flex-col gap-1">
        <div className="w-full border-border border-2 rounded-md gap-2 h-full flex items-center">
          <div className="w-max flex-1 flex-grow flex items-center justify-between">
            <Button
              className="rounded-r-none rounded-l-sm"
              variant={"secondary"}
            >
              Shopping
            </Button>
            <Button
              variant={"secondary"}
              className="justify-self-center  rounded-none"
            >
              Card Complition
            </Button>
            <Button
              variant={"secondary"}
              className="justify-self-center rounded-none rounded-r-sm "
            >
              Card
            </Button>
          </div>
          <div className="w-max border-border border-2 rounded-md bg-border md:w-min  md:h-full"></div>
          <div className="flex justify-between w-[265px]">
            <Button
              variant={"secondary"}
              className="justify-self-center  rounded-none rounded-l-sm"
            >
              Items {itemCount}
            </Button>
            <Button
              variant={"secondary"}
              className="justify-self-center  rounded-none rounded-r-sm"
            >
              Total Price: {totalPrice}$
            </Button>
          </div>
        </div>
        <div className="md:flex-row p-2 justify-between md:h-[750px] sm:gap-3 flex flex-col space-y-4 md:space-y-0 mt-2 border-border border-2  rounded-md md:flex sm:flex sm:flex-col  lg:flex-row">
          <div className="w-max flex-1 flex-grow">
            <CreditCardForm
              product_id={isAdded}
              totalPrice={totalPrice}
              totalItems={itemCount}
            />
          </div>
          <div className="w-full border-border border-2 rounded-md bg-border  md:block h-1  md:w-min md:h-full"></div>
          <div className="md:flex-col md:flex md:h-full items-center h-min overflow-x-scroll  md:overflow-y-scroll md:overflow-hidden  gap-x-1 gap-y-2 flex max-w-min">
            {cartProduct?.map((f: CartProduct) => (
              <div className=" w-64 md:w-60 relative " key={f.id}>
                <ProductCard
                  onClick={(event) => event.preventDefault()}
                  link={`/product/productName/${f.cartProduct.title}`}
                  title={f.cartProduct.title}
                  price={f.count * f.cartProduct.price}
                  image={f.cartProduct.image}
                  secondId={f.cartProduct.id}
                  id={f.id}
                  isPageShopping
                  showElement={false}
                  isInFavorites={isAdded && isAdded.includes(f.cartProduct.id)}
                  removeCartItem
                />
                <div className="absolute right-2 top-2 rounded-md bg-primary px-2 font-bold">
                  {f.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Shopping;
