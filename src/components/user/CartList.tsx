import { ArrowBigDownDash, ArrowBigUpDash, X } from "lucide-react";
import { Link } from "react-router-dom";
type CartListProps = {
  data: CartProduct[];
  isLoading: boolean;
  addToCartMutation: (id: string) => void;
  removeFromCartMutation: (id: string) => void;
  removeItem: (id: string) => void;
};

const CartList: React.FC<CartListProps> = ({
  data,
  isLoading,
  addToCartMutation,
  removeFromCartMutation,
  removeItem,
}) => {
  return (
    <div className="flex w-full flex-grow flex-col overflow-y-auto p-1 pr-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {data.map((item: CartProduct) => (
            <Link
              to={`/product/productName/${item.cartProduct.title}`}
              className="flex items-center justify-between gap-2 rounded-md ring-1 ring-secondary hover:bg-secondary"
              key={item.cartProduct.id}
            >
              <div className="ml-1 line-clamp-1 flex w-32 gap-1">
                <div className="w-[30%]"> {item.cartProduct.title}</div>
              </div>
              <div>{item.count}X</div>
              <div> {item.count * item.cartProduct.price}$</div>
              <div className="flex h-full max-w-full rounded-md bg-secondary">
                <div className="flex flex-col">
                  <ArrowBigUpDash
                    className="h-full rounded-r-none hover:rounded-l-md hover:bg-background"
                    onClick={(event) => {
                      event.preventDefault();
                      addToCartMutation(item.cartProduct.id);
                    }}
                  />
                  {isLoading ? (
                    <div>O</div>
                  ) : (
                    <ArrowBigDownDash
                      className="h-full rounded-r-none hover:rounded-l-md hover:bg-background"
                      onClick={(event) => {
                        event.preventDefault();
                        removeFromCartMutation(item.id);
                      }}
                    />
                  )}
                </div>
                <img
                  src={item.cartProduct.image}
                  alt={item.cartProduct.title}
                  decoding="async"
                  loading="lazy"
                  className="size-24 rounded-none"
                />
                <X
                  onClick={(event) => {
                    event.preventDefault();
                    removeItem(item.id);
                  }}
                  className="h-full transform-gpu rounded-md rounded-l-none py-1 transition-transform duration-100 hover:scale-110"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartList;
