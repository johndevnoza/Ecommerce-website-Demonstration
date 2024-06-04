import { Menu } from "lucide-react";
import Cart from "../user/Cart";
import SignIn from "../user/SignIn";
import { ModeToggle } from "../mode-toggle";
import LanguageSwitch from "../LanguageSwitch";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavProfile from "../user/NavProfile";

const BurgerMenu = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "block data-[state=open]:bg-primary md:hidden",
            }),
          )}
        >
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-full" sideOffset={1}>
          <div className="flex w-full items-center gap-1">
            <SignIn isAuthed />
            <NavProfile />
            <Cart />
            <ModeToggle />
            <LanguageSwitch />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BurgerMenu;
