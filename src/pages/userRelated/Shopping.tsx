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
  const { data: carts } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCarts,
  });
  const isAdded = carts ? carts.map((item) => item.product_id) : null;
  const totalPrice = cartProduct?.reduce(
    (sum, item) => sum + item.cartProduct.price,
    0
  );
  const itemCount = cartProduct ? cartProduct.length : 0;

  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MaxWidthWrapper className="mt-10 mb-44">
      <div className="w-full border-border border-2 rounded-md gap-2 flex items-center">
        <div className="w-max flex-1 flex-grow flex items-center justify-between">
          <Button className="rounded-r-none rounded-l-sm" variant={"secondary"}>
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
        <div className="w-max border-border border-2 rounded-md bg-border md:w-min md:h-full"></div>
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
      <div className="md:flex-row p-2 justify-between h-[650px] mt-2 border-border border-2  rounded-md md:flex sm:flex sm:flex-col gap-2 lg:flex-row">
        <div className="w-max flex-1 flex-grow">
          <PaymentForm />
        </div>
        <div className="w-max border-border border-2 rounded-md bg-border md:w-min md:h-full"></div>
        <div className="md:flex-col md:flex  md:overflow-x-auto  overflow-y-auto gap-x-1 gap-y-2 flex max-w-min">
          {cartProduct?.map((f: CartProduct) => (
            <div className="flex-grow-0 flex-shrink-1 w-44 md:w-60" key={f.id}>
              <ProductCard
                onClick={(event) => event.preventDefault()}
                link={`/product/productName/${f.cartProduct.title}`}
                title={f.cartProduct.title}
                price={f.cartProduct.price}
                image={f.cartProduct.image}
                secondId={f.cartProduct.id}
                id={f.id}
                isPageShopping
                showElement={false}
                isInFavorites={isAdded && isAdded.includes(f.cartProduct.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Shopping;
