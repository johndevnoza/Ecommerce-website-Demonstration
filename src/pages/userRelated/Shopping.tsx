import CreditCardForm from "@/components/form/CreditCardForm";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/cards/ProductCard";
import { fetchCarts } from "@/services/useCartsQuery";
import { CARTS_QUERY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

const Shopping = () => {
  const {
    data: cartProduct,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: [CARTS_QUERY],
    queryFn: fetchCarts,
  });
  const isAdded = cartProduct
    ? cartProduct.map((item) => item.product_id)
    : null;
  const itemCount = cartProduct ? cartProduct.length : 0;
  const totalPrice = cartProduct
    ? cartProduct.reduce(
        (acc, item) => acc + item.count * item.cartProduct.price,
        0,
      )
    : 0;

  if (isPending) {
    return <MaxWidthWrapper>Loading...</MaxWidthWrapper>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <MaxWidthWrapper className="mb-44 mt-10">
      <div className="flex flex-col gap-1">
        <div className="flex h-full w-full items-center gap-2 rounded-md border-2 border-border">
          <div className="flex w-max flex-1 flex-grow items-center justify-between">
            <Button
              className="rounded-l-sm rounded-r-none"
              variant={"secondary"}
            >
              Shopping
            </Button>
            <Button
              variant={"secondary"}
              className="justify-self-center rounded-none"
            >
              Card Complition
            </Button>
            <Button
              variant={"secondary"}
              className="justify-self-center rounded-none rounded-r-sm"
            >
              Card
            </Button>
          </div>
          <div className="w-max rounded-md border-2 border-border bg-border md:h-full md:w-min"></div>
          <div className="flex w-[265px] justify-between">
            <Button
              variant={"secondary"}
              className="justify-self-center rounded-none rounded-l-sm"
            >
              Items {itemCount}
            </Button>
            <Button
              variant={"secondary"}
              className="justify-self-center rounded-none rounded-r-sm"
            >
              Total Price: {totalPrice}$
            </Button>
          </div>
        </div>
        <div className="mt-2 flex flex-col justify-between space-y-4 rounded-md border-2 border-border p-2 sm:flex sm:flex-col sm:gap-3 md:flex md:h-[750px] md:flex-row md:space-y-0 lg:flex-row">
          <div className="w-max flex-1 flex-grow">
            <CreditCardForm
              product_id={isAdded}
              totalPrice={totalPrice}
              totalItems={itemCount}
            />
          </div>
          <div className="h-1 w-full rounded-md border-2 border-border bg-border md:block md:h-full md:w-min"></div>
          <div className="flex h-min max-w-min items-center gap-x-1 gap-y-2 overflow-x-scroll md:flex md:h-full md:flex-col md:overflow-hidden md:overflow-y-scroll">
            {cartProduct?.map((i: CartProduct) => (
              <div className="relative w-64 md:w-60" key={i.id}>
                <ProductCard
                  onClick={(event) => event.preventDefault()}
                  link={`/product/productName/${i.cartProduct.title}`}
                  title={i.cartProduct.title}
                  price={i.count * i.cartProduct.price}
                  image={i.cartProduct.image}
                  secondId={i.cartProduct.id}
                  id={i.id}
                  isPageShopping
                  total={i.count}
                  showElement={false}
                  isInFavorites={isAdded && isAdded.includes(i.cartProduct.id)}
                  removeCartItem
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Shopping;
