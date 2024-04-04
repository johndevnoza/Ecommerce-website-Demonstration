import { useState, useEffect } from "react";

export const useConditionalEffect = (
  dependency,
  defaultClass,
  animation
): string => {
  const [anim, setAnim] = useState<string>(defaultClass);

  useEffect(() => {
    setAnim(`${defaultClass} ${animation}`);
    setTimeout(() => {
      setAnim(defaultClass);
    }, 150);
  }, [dependency]);

  return anim;
};
