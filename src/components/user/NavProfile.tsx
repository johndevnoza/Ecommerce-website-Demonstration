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
import { FolderHeart, Inbox, LogOut, SubscriptIcon, User2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { favoritesQuery } from "@/services/FavoritesStorage";
import { useConditionalEffect } from "@/hooks/useConditionalEffect";
import { useUsersQuery } from "@/services/usersQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccesToken } from "@/services/authQuery";
import SignIn from "./SignIn";

export default function NavProfile() {
  const token = getAccesToken();
  const { data: user } = useUsersQuery();

  const { data, isPending } = favoritesQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const logout = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    onSettled: async () => {
      queryClient.clear();
      await queryClient.invalidateQueries();
      await queryClient.refetchQueries();
      navigate("/login");
    },
  });
  console.log(user);

  const addFavoritesAnim = useConditionalEffect(data, "favorites");
  if (isPending) {
    return (
      <div className="border-border border-2 rounded-md p-1 grid items-center">
        <div className="min-w-14 bg-secondary animate-pulse h-full rounded-sm" />
      </div>
    );
  }
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
        <span className=" md:block w-full line-clamp-1">
          {token && user?.first_name ? user?.first_name : <SignIn />}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel
          onClick={() => navigate("profile/Details")}
          className="flex items-center gap-1 hover:bg-secondary rounded-t-sm cursor-pointer"
        >
          <User2 />
          <span>{t("profile")}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex  gap-1">
          <FolderHeart className="w-5" />
          <Link to={"favorites"}> {t("favorites")}</Link>
          <div className="rounded-full bg-primary text-center size-5">
            {data?.length}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="flex gap-1">
          <Inbox className="w-5" />
          <span> {t("inbox")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="flex gap-1">
          <SubscriptIcon className="w-5" />
          <span> {t("subscription")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            logout.mutate(), navigate("/");
          }}
          className="flex gap-1 cursor-pointer"
        >
          <LogOut className="w-5" />
          <span onClick={() => logout.mutate()}> {t("logOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
