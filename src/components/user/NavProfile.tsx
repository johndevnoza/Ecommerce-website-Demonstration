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
import { favoritesQuery } from "@/services/FavoritesQuery";
import { useConditionalEffect } from "@/hooks/useConditionalEffect";
import { useUsersQuery } from "@/services/usersQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SignIn from "./SignIn";

export default function NavProfile() {
  const { data: user } = useUsersQuery();
  const { data, isPending } = favoritesQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const logout = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
      await queryClient.invalidateQueries();
      await queryClient.refetchQueries();
    },
    onSettled: async () => {
      navigate("/login");
    },
  });

  const addFavoritesAnim = useConditionalEffect(data, "favorites");
  if (isPending) {
    return (
      <div className="grid items-center rounded-md border-2 border-border p-1">
        <div className="h-full min-w-14 animate-pulse rounded-sm bg-secondary" />
      </div>
    );
  }
  return (
    <DropdownMenu>
      {user?.first_name ? (
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({
              variant: "outline",
              className: addFavoritesAnim,
            }),
          )}
        >
          {user?.first_name}
        </DropdownMenuTrigger>
      ) : (
        <SignIn isAuthed={user?.first_name > 0} />
      )}
      <DropdownMenuContent>
        <DropdownMenuLabel
          onClick={() => navigate("profile/Details")}
          className="flex cursor-pointer items-center gap-1 rounded-t-sm hover:bg-secondary"
        >
          <User2 />
          <span>{t("profile")}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-1">
          <FolderHeart className="w-5" />
          <Link to={"favorites"}> {t("favorites")}</Link>
          <div className="size-5 rounded-full bg-primary text-center">
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
          className="flex cursor-pointer gap-1"
        >
          <LogOut className="w-5" />
          <span onClick={() => logout.mutate()}> {t("logOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
