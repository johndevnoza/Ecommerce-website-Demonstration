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

export default function Links() {
  // const location = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(buttonVariants())}>
            Navigation
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
              <Link to="/products">All Products</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full  cursor-pointer",
                })
              )}
            >
              <Link to="/products/categories">Categories</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/products">About Us</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/products">Contact</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/products">Offices</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full cursor-pointer",
                })
              )}
            >
              <Link to="/products">Map</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
