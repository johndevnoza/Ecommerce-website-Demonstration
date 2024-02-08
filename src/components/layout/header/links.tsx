// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Link, useLocation } from "react-router-dom";

// const links: linkProps[] = [
//   {
//     title: "Products",
//     path: "/products",
//   },
//   {
//     title: "About",
//     path: "/about",
//   },
//   {
//     title: "Contact",
//     path: "/contact",
//   },
//   {
//     title: "Blog",
//     path: "/blog",
//   },
// ];

import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Links() {
  // const location = useLocation();
  const { t } = useTranslation();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(buttonVariants())}>
            {t("navigation")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/products"> {t("allProducts")}</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full  cursor-pointer",
                })
              )}
            >
              <Link to="/products/categories"> {t("categories")}</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/about"> {t("aboutUs")}</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/contact"> {t("contact")}</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/offices"> {t("offices")}</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/map"> {t("map")}</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
