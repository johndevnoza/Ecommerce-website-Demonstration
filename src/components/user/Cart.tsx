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
import { buttonVariants } from "../ui/button.tsx";
import { Separator } from "../ui/separator.tsx";
import HoverInfoElement from "../ui/HoverInfoElement.tsx";
import { cartsQuery } from "@/services/useCartsQuery.tsx";

const Cart: React.FC = () => {
  const { data, isLoading, isError, error, isPending } = cartsQuery();

  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const itemCount = data ? data.length : 0;

  return (
    <Sheet>
      <HoverInfoElement hoverContent="Cart" shouldHover side="bottom">
        <SheetTrigger className="flex m-auto items-center ring-border ring-1 rounded-md p-2">
          <ShoppingCart
            aria-hidden="true"
            color={itemCount > 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"}
            className="h-6 w-6 flex-shrink-0"
          />
          {isPending ? (
            <div>Ts..</div>
          ) : (
            <span
              className={
                itemCount > 0
                  ? "text-primary ml-2 text-sm font-medium animate-bounce"
                  : " ml-2 text-sm font-medium text-muted"
              }
            >
              {itemCount}
            </span>
          )}
        </SheetTrigger>
      </HoverInfoElement>
      <SheetContent className=" flex w-full flex-col pr-0  sm:max-w-lg ">
        <SheetHeader className="space-y-2.5 pr-6 ">
          <SheetTitle>cart </SheetTitle>
        </SheetHeader>
        {data ? (
          <>
            <div> Cart items {itemCount}</div>
            <div className="flex w-full flex-col pr-6 overflow-y-auto flex-grow">
              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col">
                  {data.map((item) => (
                    <div
                      className="flex justify-between"
                      key={item.cartProduct.id}
                    >
                      <div> {item.cartProduct.title}</div>
                      <div> {item.cartProduct.price}$</div>
                      <img
                        src={item.cartProduct.image}
                        alt=""
                        className="size-24"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div>qvevit</div>
              <div className="space-y-1.5 text-sm">
                <div className="flex ">
                  <span className="flex-1">Total</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    to="/cart"
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
