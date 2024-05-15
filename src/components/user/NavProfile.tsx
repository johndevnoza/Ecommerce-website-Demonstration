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
  FolderHeart,
  Inbox,
  Loader,
  LogOut,
  SubscriptIcon,
  User,
  User2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { favoritesQuery } from "@/services/FavoritesStorage";
import { useConditionalEffect } from "@/hooks/useConditionalEffect";
import { useUsersQuery } from "@/services/usersQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USERS_QUERY } from "@/utils/constants";

export default function NavProfile() {
  const { data, isLoading } = favoritesQuery();
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const logout = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
    },
    onSettled: async () => {
      queryClient.clear();
      await queryClient.invalidateQueries();
      await queryClient.refetchQueries();
      await queryClient.invalidateQueries({ queryKey: [USERS_QUERY] });
      await queryClient.refetchQueries({ queryKey: [USERS_QUERY] });
      navigate("/login");
    },
  });
  const { data: user } = useUsersQuery();
  const navigate = useNavigate();
  const addFavoritesAnim = useConditionalEffect(data, "favorites");
  if (isLoading) {
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
        <span className="hidden lg:block"> {user && user.first_name}</span>
        <User className="group-hover:translate-x-1 " />
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
        <DropdownMenuItem className="flex gap-1">
          <Inbox className="w-5" />
          <span> {t("inbox")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-1">
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
