import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Links from "./links";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

export default function Header() {
  return (
    <div className="sticky z-50 top-0 bg-background inset-x-0 h-16">
      <header className="relative">
        <MaxWidthWrapper>
          <div className="border-b border-border">
            <div className="flex h-16 items-center justify-between">
              <Link
                to="/"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    className: "[&.active]:bg-primary",
                  })
                )}
              >
                Logo
              </Link>
              <Links />
              <ModeToggle />
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
