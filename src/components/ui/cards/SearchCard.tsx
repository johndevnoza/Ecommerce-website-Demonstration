import { memo } from "react";
import { twMerge } from "tailwind-merge";

function SearchCard({ image, title, price, className }: ProductData) {
  return (
    <>
      <div
        className={twMerge(
          "flex gap-2 justify-between items-center overflow-hidden",
          className
        )}
      >
        <img
          src={image}
          alt={title}
          className="object-cover w-[50px] h-[50px] object-center"
        />
        <title className="line-clamp-1 py-2">{title}</title>
        <p className="p-0">{price}$</p>
      </div>
    </>
  );
}

export default memo(SearchCard);
