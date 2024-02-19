import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Inbox, LogOut, SubscriptIcon, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/services/authContext";

export default function Profile() {
  // const { data: userData } = useUsersQuery();

  const { t } = useTranslation();
  const { logout } = useUserStore();
  const user = useUserStore((state) => state.user);
  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            className:
              "flex gap-2  data-[state=open]:border-primary  data-[state=open]:scale-110",
          })
        )}
      >
        <span className="hidden lg:block"> {t("profile")}</span>
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel> {t("myAccount")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-1">
          <User className="w-5" />
          <span> {user ? user.first_name : t("profile")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1">
          <Inbox className="w-5" />
          <span> {t("inbox")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1">
          <SubscriptIcon className="w-5" />
          <span> {t("subscription")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1">
          <LogOut className="w-5" />
          <span onClick={logout}> {t("logOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
