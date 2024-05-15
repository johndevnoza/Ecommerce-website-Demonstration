import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button, buttonVariants } from "../../ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import BurgerMenuTest from "@/components/ui/BurgerMenuTest";
import LanguageSwitch from "@/components/LanguageSwitch";
import SignIn from "@/components/user/SignIn";
import Cart from "@/components/user/Cart";
import Links from "./links";
import HoverInfoElement from "@/components/ui/HoverInfoElement";
import NavProfile from "@/components/user/NavProfile";
import { useUsersQuery } from "@/services/usersQuery";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
export default function Header() {
  const { data: user, isFetching } = useUsersQuery();
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/login")) {
      setRefresh(true);
      setTimeout(() => {
        setRefresh(false);
      }, 100);
    }
  }, []);

  return (
    <div className="sticky z-50 top-0 bg-background border-b-2 border-border inset-x-0 h-16">
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
              {!refresh ? (
                <div className="md:flex gap-1">
                  {user?.first_name !== undefined ? (
                    <NavProfile />
                  ) : user && isFetching ? (
                    <div
                      className={cn(
                        buttonVariants({
                          variant: "secondary",
                          className: "flex gap-2",
                        })
                      )}
                    >
                      <span>Loading</span>
                      <LoaderIcon className="animate-spin" />
                    </div>
                  ) : (
                    <SignIn />
                  )}
                  {user ? <Cart /> : null}
                </div>
              ) : null}
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
            <BurgerMenuTest user={user} />
          </div>
          {/* </div> */}
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
