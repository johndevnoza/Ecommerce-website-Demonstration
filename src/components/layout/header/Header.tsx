import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Links from "./links";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import SignIn from "@/components/ui/user/SignIn";
import Profile from "@/components/ui/user/Profile";
import Cart from "@/components/ui/user/Cart";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import LanguageSwitch from "@/components/LanguageSwitch";

import { Menu } from "lucide-react";
import BurgerMenu from "@/components/ui/BurgerMenu";
import BurgerMenuTest from "@/components/ui/BurgerMenuTest";

// mocking user AUTH
const user: string = "signsed";

export default function Header() {
  return (
    <div className="sticky z-50 top-0 bg-background border-b-2 border-border inset-x-0 h-16">
      <header className="relative w-full">
        <MaxWidthWrapper>
          {/* <div className="border-b border-border"> */}
          <div className="flex h-16 items-center justify-between">
            <div className="flex gap-2">
              <Link
                to="/"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  })
                )}
              >
                Logo
              </Link>
              <Links />
            </div>
            <ProductSearchBar />
            <div className="md:flex gap-1 hidden">
              {user === "signed" ? <SignIn /> : <Profile />}
              <Cart />
              <ModeToggle />
              <LanguageSwitch />
            </div>
            <BurgerMenu user={user} />
            <BurgerMenuTest user={user} />
          </div>
          {/* </div> */}
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
