import HoverInfoElement from "./HoverInfoElement";
import { UnAuthedDialog } from "../UnAuthedDialog";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import useUserStore from "@/services/authContext";
// this is a custom button component, which includes button variants and also redirections and hover infromations if required
type Side = "top" | "bottom" | "left" | "right";
type ButtonVariant =
  | "ghost"
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary";
type InteractButtonProps = {
  children?: ReactNode;
  title?: string | number;
  hoverContent?: string;
  hoverSide?: Side;
  redirect?: string;
  buttonVariant?: ButtonVariant;
  iconClass?: string;
  buttonClass?: string;
  showInfo?: boolean;
  icon?: boolean;
  onClick?: () => void;
};
const InteractiveButton: React.FC<InteractButtonProps> = ({
  children,
  title,
  hoverContent,
  hoverSide,
  redirect = "",
  buttonVariant = "ghost",
  iconClass,
  buttonClass,
  showInfo = false,
  icon = false,
  onClick,
}) => {
  const navigate = useNavigate();
  const authorized = useUserStore((state) => state.authorized);

  return (
    <HoverInfoElement
      side={hoverSide}
      shouldHover={showInfo}
      hoverContent={hoverContent}
    >
      <UnAuthedDialog>
        {!icon ? (
          <Button
            variant={buttonVariant}
            className={buttonClass}
            onClick={() => {
              if (authorized) {
                navigate(redirect);
              }
            }}
          >
            {title}
          </Button>
        ) : (
          <div onClick={onClick} className={iconClass}>
            {children}
          </div>
        )}
      </UnAuthedDialog>
    </HoverInfoElement>
  );
};

export default InteractiveButton;
