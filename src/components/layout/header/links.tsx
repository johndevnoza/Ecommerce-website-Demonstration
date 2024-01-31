import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const links: linkProps[] = [
  {
    title: "Products",
    path: "/products",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];
export default function Links() {
  return (
    <div className="flex gap-8 ">
      {links.map((link) => (
        <Link
          className={cn(
            buttonVariants({
              variant: "secondary",
              className: "[&.active]:bg-primary",
            })
          )}
          to={link.path}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
