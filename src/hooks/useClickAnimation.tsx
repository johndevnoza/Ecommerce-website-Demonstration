import { MouseEvent } from "react";
//  EXPERIMENTAL COMPONENT
const useClickAnimation = () => {
  const handleMouseDown = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    (event.target as HTMLElement).style.transform = "scale(0.8)";
  };

  const handleMouseUp = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    (event.target as HTMLElement).style.transform = "scale(1.2)";
  };

  return { handleMouseDown, handleMouseUp };
};

export default useClickAnimation;
