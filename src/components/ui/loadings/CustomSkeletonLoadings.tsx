import React from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../input";
import { Button } from "../button";
import { Edit } from "lucide-react";

export const ProductsSkeleton: React.FC = () => {
  return (
    <div className="flex w-[100%] flex-col gap-4">
      <div className="items flex min-w-[100%] animate-pulse flex-col items-center gap-2 rounded-lg border-2 border-border bg-background p-3">
        <div className="size-[100%] h-48 animate-pulse rounded-md bg-secondary" />
        <div className="flex w-full flex-col gap-2">
          <div className="h-6 w-[75%] animate-pulse rounded-md bg-secondary" />
          <div className="h-4 w-[50%] animate-pulse rounded-full bg-secondary" />
          <div className="h-4 w-[90%] animate-pulse rounded-full bg-secondary" />
        </div>
        <div className="mt-2 h-10 w-full animate-pulse rounded-md bg-secondary"></div>
      </div>
    </div>
  );
};
export const SmallProductsSkeleton = ({
  responsive,
}: {
  responsive: string;
}) => {
  return (
    <div className={(twMerge("flex w-[100%] flex-col gap-1"), responsive)}>
      <div className="items flex h-[185px] min-w-[100%] animate-pulse flex-col items-center gap-2 rounded-lg border-2 border-border bg-background p-3">
        <div className="size-[100%] h-48 animate-pulse rounded-md bg-secondary" />
        <div className="mt-2 h-10 w-full animate-pulse rounded-md bg-secondary"></div>
      </div>
    </div>
  );
};
export const ProfileDetailsSkeleton = () => {
  return (
    <div className="flex h-full min-h-full w-full flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-1 md:px-0">
      <form className="flex w-full flex-col items-center justify-center md:flex-row">
        <div className="flex w-max items-center gap-1 self-start md:order-1">
          <Edit className="ml-1 cursor-pointer" />
          <Button className="invisible">Update</Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-max items-center justify-between">
            <label htmlFor="firstName" className="w-24">
              First name
            </label>

            <Input disabled type="text" className="w-min min-w-0" />
          </div>
          <div className="flex w-max items-center justify-between">
            <label htmlFor="lastName" className="w-24">
              Last name
            </label>
            <Input disabled type="text" className="w-min min-w-0" />
          </div>
          <div className="flex w-max items-center justify-between">
            <label htmlFor="password" className="w-24">
              Password
            </label>
            <Input disabled type="text" className="w-min min-w-0" />
          </div>
          <div className="flex w-max items-center justify-between">
            <label htmlFor="phoneNumber" className="w-24">
              Phone number
            </label>
            <Input disabled type="text" className="w-min min-w-0" />
          </div>
          <div className="flex w-max items-center justify-between">
            <label htmlFor="email" className="w-24">
              Email
            </label>
            <Input disabled type="text" className="w-min min-w-0" />
          </div>
        </div>
      </form>
    </div>
  );
};
