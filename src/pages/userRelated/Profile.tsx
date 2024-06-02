import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const profileNav = ["Details", "Orders", "Statistics"];

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const queryClient = useQueryClient();
  const logout = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("accessToken"), navigate("/");
    },
    onSettled: () => {
      queryClient.removeQueries();
      queryClient.refetchQueries();
    },
  });
  return (
    <MaxWidthWrapper className="mb-44 mt-10">
      <section className="flex gap-2 rounded-md border border-border p-2">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex w-min flex-col gap-2">
            {profileNav.map((t) => (
              <Link key={t} to={`/profile/${t}`}>
                <Button
                  variant={pathname.includes(t) ? "default" : "secondary"}
                >
                  {t}
                </Button>
              </Link>
            ))}
          </div>
          <Button onClick={() => logout.mutate()} variant={"secondary"}>
            Log out
          </Button>
        </div>
        <div className="w-2 rounded-md bg-secondary md:min-h-full"></div>
        <Outlet />
      </section>
    </MaxWidthWrapper>
  );
};

export default Profile;
