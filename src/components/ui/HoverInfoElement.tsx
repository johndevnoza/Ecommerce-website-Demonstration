import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { PropsWithChildren, ReactNode } from "react";

type Side = "top" | "bottom" | "left" | "right";

type HoverElementProps = {
  children?: ReactNode;
  hoverContent?: string;
  side?: Side;
  shouldHover?: boolean;
};
const HoverInfoElement = ({
  children,
  hoverContent,
  side = "left",
  shouldHover = false,
}: PropsWithChildren<HoverElementProps>) => {
  return (
    <>
      {shouldHover ? (
        <HoverCard >
          <HoverCardTrigger>{children}</HoverCardTrigger>
          <HoverCardContent side={side} align="end">
            {hoverContent}
          </HoverCardContent>
        </HoverCard>
      ) : (
        children
      )}
    </>
  );
};

export default HoverInfoElement;
