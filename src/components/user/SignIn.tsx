import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

export default function SignIn() {
  return (
    <Link
      to={"/login"}
      className={cn(
        buttonVariants({
          variant: "outline",
          className: "flex gap-2",
        })
      )}
    >
      <span>Sign in</span>
      <User />
    </Link>
  );
}
