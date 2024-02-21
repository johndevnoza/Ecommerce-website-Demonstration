import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "../../ui/button";
import { useUserStore } from "@/services/authContext";
import { ModeToggle } from "@/components/mode-toggle";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import BurgerMenuTest from "@/components/ui/BurgerMenuTest";
import LanguageSwitch from "@/components/LanguageSwitch";
import Profile from "@/components/user/NavProfile";
import SignIn from "@/components/user/SignIn";
import Cart from "@/components/user/Cart";
import Links from "./links";
import { PropagationStopper } from "@/hooks/PropagationStopper";
import { UnAuthedDialog } from "@/components/UnAuthedDialog";
export default function Header() {
  const user = useUserStore((state) => state.user);
  const authorized = useUserStore((state) => state.authorized);

  return (
    <div className="sticky z-50 top-0 bg-background border-b-2 border-border inset-x-0 h-16">
      <header className="relative w-full">
        <MaxWidthWrapper>
          {/* <div className="border-b border-border"> */}
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
              {authorized ? <Profile /> : <SignIn />}
              <Cart />
              <ModeToggle />
              <LanguageSwitch />
            </div>
            <BurgerMenuTest user={user} />
          </div>
          {/* </div> */}
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
