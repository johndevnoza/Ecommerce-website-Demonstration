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
import { FolderHeart, Inbox, LogOut, SubscriptIcon, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/services/authContext";
import { Link, useNavigate } from "react-router-dom";
import { favoritesQuery } from "@/services/FavoritesStorage";
import { useConditionalEffect } from "@/hooks/useConditionalEffect";

export default function Profile() {
  const { data } = favoritesQuery();

  const { t } = useTranslation();
  const { logout } = useUserStore();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const addFavoritesAnim = useConditionalEffect(data, "favorites");
  console.log(data);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            className: addFavoritesAnim,
          })
        )}
      >
        <span className="hidden lg:block"> {user && user.first_name}</span>
        <User className="group-hover:translate-x-1 " />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel> {t("myAccount")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex  gap-1">
          <FolderHeart className="w-5" />
          <Link to={"favorites"}> {t("favorites")}</Link>
          <div className="rounded-full bg-primary text-center size-5">
            {data?.length}
          </div>
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
