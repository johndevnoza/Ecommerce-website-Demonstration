import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "../../ui/button";
import { Link, useLocation } from "react-router-dom";
import Links from "./links";
import Cart from "@/components/user/Cart";
import SignIn from "@/components/user/SignIn";
import LanguageSwitch from "@/components/LanguageSwitch";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import HoverInfoElement from "@/components/ui/HoverInfoElement";
import InactivityAlert from "@/components/ui/InactivityAlert";
import NavProfile from "@/components/user/NavProfile";
import BurgerMenu from "@/components/ui/BurgerMenu";
import { useUsersQuery } from "@/services/usersQuery";
import { useEffect } from "react";

export default function Header() {
  const { data, refetch } = useUsersQuery();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") refetch();
  }, []);

  return (
    <div className="sticky z-50 top-0 bg-background border-b-2 border-border inset-x-0 h-16">
      <InactivityAlert />
      <header className="relative w-full">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between">
            <div className="flex gap-2">
              <Link
                to={"/"}
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
              {data?.first_name ? <NavProfile /> : <SignIn />}
              {data?.first_name ? <Cart /> : null}
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
            <BurgerMenu user={data?.first_name} />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
