import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, X } from "lucide-react";
import { updateUser, useUsersQuery } from "@/services/usersQuery.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { USERS_QUERY } from "@/utils/constants";
import { ProfileDetailsSkeleton } from "@/components/ui/loadings/CustomSkeletonLoadings";

const ProfileDetails = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useUsersQuery();
  const [editIcon, setEditIcon] = useState(true);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
  });
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const cancel = () => {
    setEditIcon(true);
    setUser(data);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateUser(user);
    setEditIcon(true);
    setUser(data);
    await queryClient.invalidateQueries({ queryKey: [USERS_QUERY] });
  };
  if (isFetching) {
    return <ProfileDetailsSkeleton />;
  }

  if (data)
    return (
      <div className="flex h-full min-h-full w-full flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-1 md:px-0">
        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col items-center justify-center md:flex-row"
        >
          <div className="flex w-max items-center gap-1 self-start md:order-1">
            {editIcon ? (
              <Edit
                onClick={() => setEditIcon(false)}
                className="ml-1 cursor-pointer"
              />
            ) : (
              <X className="ml-1 cursor-pointer" onClick={cancel} />
            )}
            <Button
              className={`${
                !editIcon
                  ? "ml-1 cursor-pointer"
                  : "invisible ml-1 cursor-pointer"
              }`}
              type="submit"
            >
              Update
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-max items-center justify-between">
              <label htmlFor="firstName" className="w-24">
                First name
              </label>

              <Input
                disabled={editIcon}
                type="text"
                className="w-min min-w-0"
                value={user?.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
              />
            </div>
            <div className="flex w-max items-center justify-between">
              <label htmlFor="lastName" className="w-24">
                Last name
              </label>
              <Input
                disabled={editIcon}
                type="text"
                className="w-min min-w-0"
                value={user?.last_name}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
              />
            </div>
            <div className="flex w-max items-center justify-between">
              <label htmlFor="password" className="w-24">
                Password
              </label>
              <Input
                disabled={editIcon}
                type="text"
                className="w-min min-w-0"
                value={user?.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="flex w-max items-center justify-between">
              <label htmlFor="phoneNumber" className="w-24">
                Phone number
              </label>
              <Input
                disabled={editIcon}
                type="text"
                className="w-min min-w-0"
                value={user?.phone_number}
                onChange={(e) =>
                  setUser({ ...user, phone_number: e.target.value })
                }
              />
            </div>
            <div className="flex w-max items-center justify-between">
              <label htmlFor="email" className="w-24">
                Email
              </label>
              <Input
                disabled={editIcon}
                type="text"
                className="w-min min-w-0"
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>
        </form>
      </div>
    );
};

export default ProfileDetails;
