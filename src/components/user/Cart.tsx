import { ShoppingBagIcon, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet.tsx";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button.tsx";
import { Separator } from "../ui/separator.tsx";
import HoverInfoElement from "../ui/HoverInfoElement.tsx";
import {
  addToCart,
  fetchCarts,
  removeFromCart,
} from "@/services/useCartsQuery.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useConditionalEffect } from "@/hooks/useConditionalEffect.tsx";

const Cart: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isPending, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCarts,
  });

  const numberOfItems = data ? data.length : 0;
  const totalPrice = data
    ? data.reduce((acc, item) => acc + item.count * item.cartProduct.price, 0)
    : 0;

  const removeFromCartMutation = useMutation({
    mutationFn: async (item: string) => removeFromCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const addToCartMutation = useMutation({
    mutationFn: async (item: string) => addToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const addToCartAnimation = useConditionalEffect(data, "cart");
  const removeCartAnimation = useConditionalEffect(data, "removeFromCart");
console.log(data,"carts");

  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Sheet>
      <HoverInfoElement hoverContent="Cart" shouldHover side="bottom">
        <SheetTrigger className="flex m-auto  items-center ring-border ring-1 bg-background rounded-md p-2">
          <ShoppingCart
            aria-hidden="true"
            color={
              numberOfItems > 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"
            }
            className={addToCartAnimation}
          />
          {isPending ? (
            <div>Ts..</div>
          ) : (
            <span
              className={
                numberOfItems > 0
                  ? "text-primary ml-2 text-sm font-medium animate-bounce "
                  : " ml-2 text-sm font-medium text-muted"
              }
            >
              {numberOfItems}
            </span>
          )}
        </SheetTrigger>
      </HoverInfoElement>
      <SheetContent className=" flex w-full flex-col pr-0  sm:max-w-lg ">
        <SheetHeader className="space-y-2.5 pr-6 ">
          <SheetTitle>cart </SheetTitle>
        </SheetHeader>
        {data.length ? (
          <>
            <div className="flex justify-between">
              <div> Cart items {numberOfItems}</div>
              <div
                onClick={() => queryClient.refetchQueries()}
                className="mr-12 cursor-pointer "
              >
                Refresh
              </div>
            </div>
            <div className="flex w-full p-1 flex-col pr-6 overflow-y-auto flex-grow">
              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-2">
                  {data.map((item: CartProduct) => (
                    <Link
                      to={`/product/productName/${item.cartProduct.title}`}
                      className={removeCartAnimation}
                      key={item.cartProduct.id}
                    >
                      <div className="flex gap-1 ml-1 min-w-max  flex-grow">
                        <div className="w-[30%]"> {item.cartProduct.title}</div>
                        <div>{item.count}X</div>
                      </div>
                      <div> {item.count * item.cartProduct.price}$</div>
                      <div className="flex h-full max-w-full">
                        <Button
                          variant={"secondary"}
                          className="w-min h-full rounded-r-none hover:bg-primary font-extrabold"
                          disabled={isPending}
                          onClick={(event) => {
                            event.preventDefault();
                            addToCartMutation.mutate(item.cartProduct.id);
                          }}
                        >
                          +
                        </Button>
                        <img
                          src={item.cartProduct.image}
                          alt=""
                          className="size-24 w- rounded-r-none   rounded-md"
                        />
                        {isLoading ? (
                          <div>O</div>
                        ) : (
                          <Button
                            variant={"secondary"}
                            className="w-min h-full rounded-l-none hover:bg-primary font-extrabold"
                            disabled={isPending}
                            onClick={(event) => {
                              event.preventDefault();
                              removeFromCartMutation.mutate(item.id);
                            }}
                          >
                            -
                          </Button>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex ">
                  <span className="flex-1">
                    Total Price: {totalPrice > 0 ? totalPrice : 0}$
                  </span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    to="/shopping"
                    className={cn(
                      buttonVariants({
                        className: "w-full",
                      })
                    )}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          // if cart is empty
          <div className="flex h-full flex-col  items-center justify-center space-y-1 ">
            <div
              aria-hidden="true"
              className=" relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <ShoppingBagIcon className="w-44 h-44 grid m-auto" />
            </div>
            <div className="text-xl font-semibold ">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                to=""
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-sm text-muted-foreground",
                  })
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
