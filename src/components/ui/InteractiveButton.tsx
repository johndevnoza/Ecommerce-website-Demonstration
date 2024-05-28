import HoverInfoElement from "./HoverInfoElement";
import { UnAuthedDialog } from "../UnAuthedDialog";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useUsersQuery } from "@/services/usersQuery";
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
  link?: boolean;
  buttonVariant?: ButtonVariant;
  iconClass?: string;
  buttonClass?: string;
  wrapperClass?: string;
  showInfo?: boolean;
  showDialog?: boolean;
  icon?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
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
  link = false,
  showDialog = true,
  wrapperClass,
  disabled = false,
}) => {
  const navigate = useNavigate();
  const { data: user } = useUsersQuery();
  return (
    <div onClick={onClick} className={wrapperClass}>
      <HoverInfoElement
        side={hoverSide}
        shouldHover={showInfo}
        hoverContent={hoverContent}
      >
        <UnAuthedDialog noRestriction={!showDialog}>
          {!icon ? (
            <Button
              disabled={disabled}
              variant={buttonVariant}
              className={buttonClass}
              onClick={() => {
                if (user || link) {
                  navigate(redirect);
                }
              }}
            >
              {title}
            </Button>
          ) : (
            <div className={iconClass}>{children}</div>
          )}
        </UnAuthedDialog>
      </HoverInfoElement>
    </div>
  );
};

export default InteractiveButton;
