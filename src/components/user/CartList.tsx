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
    <div className="flex w-full p-1 flex-col pr-6 overflow-y-auto flex-grow">
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col gap-2">
          {data.map((item: CartProduct) => (
            <Link
              to={`/product/productName/${item.cartProduct.title}`}
              className="flex justify-between gap-2 items-center rounded-md ring-secondary ring-1  hover:bg-secondary"
              key={item.cartProduct.id}
            >
              <div className="flex gap-1 ml-1  w-32 line-clamp-1">
                <div className="w-[30%]"> {item.cartProduct.title}</div>
              </div>
              <div>{item.count}X</div>
              <div> {item.count * item.cartProduct.price}$</div>
              <div className="flex h-full max-w-full bg-secondary rounded-md ">
                <div className="flex flex-col">
                  <ArrowBigUpDash
                    className=" h-full rounded-r-none hover:bg-background hover:rounded-l-md"
                    onClick={(event) => {
                      event.preventDefault();
                      addToCartMutation(item.cartProduct.id);
                    }}
                  />
                  {isLoading ? (
                    <div>O</div>
                  ) : (
                    <ArrowBigDownDash
                      className=" h-full rounded-r-none hover:bg-background hover:rounded-l-md"
                      onClick={(event) => {
                        event.preventDefault();
                        removeFromCartMutation(item.id);
                      }}
                    />
                  )}
                </div>
                <img
                  src={item.cartProduct.image}
                  alt=""
                  className="size-24  rounded-none "
                />
                <X
                  onClick={(event) => {
                    event.preventDefault();
                    removeItem(item.id);
                  }}
                  className="transform-gpu hover:scale-110 h-full  rounded-md rounded-l-none py-1 transition-transform duration-100 "
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
