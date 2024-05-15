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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BurgerMenuTest = ({ user }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            className: "md:hidden block data-[state=open]:bg-primary ",
          })
        )}
      >
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={1}>
        <div className="flex items-center ">
          {!user ? <SignIn /> : <Profile />}
          <Cart />
          <ModeToggle />
          <LanguageSwitch />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BurgerMenuTest;
