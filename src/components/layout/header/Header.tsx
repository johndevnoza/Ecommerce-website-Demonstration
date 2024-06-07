import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "../../ui/button";
import { Link } from "react-router-dom";
import Links from "./links";
import Cart from "@/components/user/Cart";
import LanguageSwitch from "@/components/LanguageSwitch";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import HoverInfoElement from "@/components/ui/HoverInfoElement";
import InactivityAlert from "@/components/ui/InactivityAlert";
import NavProfile from "@/components/user/NavProfile";
import BurgerMenu from "@/components/ui/BurgerMenu";

export default function Header() {
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 border-b-2 border-border bg-background">
      <InactivityAlert />
      <header className="relative w-full">
        <MaxWidthWrapper className="h-auto">
          <div className="flex h-16 items-center justify-between">
            <div className="flex gap-2">
              <Link
                to={"/"}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                )}
              >
                Logo
              </Link>
              <Links />
            </div>
            <ProductSearchBar />
            <div className="hidden gap-1 md:flex">
              <NavProfile />
              <Cart />
              <HoverInfoElement hoverContent="Theme" shouldHover side="bottom">
                <ModeToggle />
              </HoverInfoElement>
              <HoverInfoElement
                hoverContent="Language"
                shouldHover
                side="bottom"
              >
                <LanguageSwitch />
              </HoverInfoElement>
            </div>
            <BurgerMenu />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
