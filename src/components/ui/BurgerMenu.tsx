import { Menu } from "lucide-react";
import { useState } from "react";
import Cart from "../user/Cart";
import SignIn from "../user/SignIn";
import Profile from "../user/NavProfile";
import { ModeToggle } from "../mode-toggle";
import LanguageSwitch from "../LanguageSwitch";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BurgerMenu = ({ user }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden relative">
      <button
        disabled
        onMouseDownCapture={() => {
          setIsOpen(!isOpen);
        }}
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        <Menu />
      </button>
      {isOpen ? (
        <div className="absolute right-0 bg-background flex ">
          {user === "signed" ? <SignIn /> : <Profile />}
          <div className={cn(buttonVariants({ variant: "outline" }))}>
            <Cart />
          </div>
          <ModeToggle />
          <LanguageSwitch />
        </div>
      ) : null}
    </div>
  );
};

export default BurgerMenu;
