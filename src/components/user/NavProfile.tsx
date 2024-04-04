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
import {
  FolderArchive,
  FolderHeart,
  Inbox,
  LogOut,
  SubscriptIcon,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/services/authContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { t } = useTranslation();
  const { logout } = useUserStore();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            className:
              "flex gap-2  data-[state=open]:border-primary group data-[state=open]:scale-110",
          })
        )}
      >
        <span className="hidden lg:block"> {user && user.first_name}</span>
        <User className="group-hover:translate-x-1 " />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel> {t("myAccount")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-1">
          <FolderHeart className="w-5" />
          <Link to={"favorites"}> {t("favorites")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1">
          <Inbox className="w-5" />
          <span> {t("inbox")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1">
          <SubscriptIcon className="w-5" />
          <span> {t("subscription")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("login")}
          className="flex gap-1"
        >
          <LogOut className="w-5" />
          <span onClick={logout}> {t("logOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
