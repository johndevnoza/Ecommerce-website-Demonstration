import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { buttonVariants } from "../button";

export default function SignIn() {
  return (
    <div
      className={cn(
        buttonVariants({
          variant: "outline",
          className: "flex gap-2",
        })
      )}
    >
      <span>Sign in</span>
      <User />
    </div>
  );
}
