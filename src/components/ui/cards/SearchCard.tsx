import { memo } from "react";
import { twMerge } from "tailwind-merge";

function SearchCard({ image, title, price, className }: ProductData) {
  return (
    <>
      <div
        className={twMerge(
          "flex items-center justify-between gap-2 overflow-hidden",
          className,
        )}
      >
        <img
          src={image}
          alt={title}
          className="h-[50px] w-[50px] object-cover object-center"
        />
        <title className="line-clamp-1 py-2">{title}</title>
        <p className="p-0">{price}$</p>
      </div>
    </>
  );
}

export default memo(SearchCard);
