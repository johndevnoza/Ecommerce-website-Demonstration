import { useState, useEffect } from "react";
//  EXPERIMENTAL COMPONENT
type AnimationType = "cart" | "favorites" | "default" | "removeFromCart";

export const useConditionalEffect = (
  dependency:
    | string
    | ProductData
    | CartProduct[]
    | undefined
    | null
    | LikedProduct[],
  animationType: AnimationType
): string => {
  const animations = {
    cart: {
      defaultClass: "h-6 w-6 flex-shrink-0",
      animation: "h-6 w-6 flex-shrink-0 scale-150 animate-in",
    },
    removeFromCart: {
      defaultClass:
        " flex justify-between gap-2 items-center rounded-md ring-secondary ring-1  hover:bg-secondary",
      animation:
        " flex justify-between gap-2 bg-secondary items-center rounded-md ring-secondary ring-1",
    },
    favorites: {
      defaultClass:
        "flex gap-2 w-full line-clamp-1  data-[state=open]:border-primary group data-[state=open]:scale-110",
      animation:
        "flex gap-2  data-[state=open]:border-primary group data-[state=open]:scale-110 bg-primary",
    },
    
    default: {
      defaultClass: "h-6 w-6 flex-shrink-0",
      animation: "h-6 w-6 flex-shrink-0 animate-pulse",
    },
  };

  const { defaultClass, animation } =
    animations[animationType] || animations.default;

  const [anim, setAnim] = useState<string>(defaultClass);

  useEffect(() => {
    setAnim(`${defaultClass} ${animation}`);
    setTimeout(() => {
      setAnim(defaultClass);
    }, 150);
  }, [dependency]);

  return anim;
};
