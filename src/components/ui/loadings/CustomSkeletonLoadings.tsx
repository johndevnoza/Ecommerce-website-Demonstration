import React from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../input";
import { Button } from "../button";
import { Edit, X } from "lucide-react";

export const ProductsSkeleton: React.FC = () => {
  return (
    <div className="w-[100%] flex flex-col gap-4">
      <div className="flex flex-col gap-2 min-w-[100%] items bg-background items-center animate-pulse border-border border-2 rounded-lg p-3">
        <div className="size-[100%] h-48 rounded-md bg-secondary animate-pulse" />
        <div className="flex flex-col gap-2 w-full">
          <div className="w-[75%]  h-6 rounded-md bg-secondary animate-pulse" />
          <div className="w-[50%] h-4 rounded-full bg-secondary animate-pulse" />
          <div className="w-[90%] h-4 rounded-full bg-secondary animate-pulse" />
        </div>
        <div className="w-full h-10 mt-2 rounded-md bg-secondary animate-pulse"></div>
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
    <div className={(twMerge("w-[100%] flex flex-col gap-1 "), responsive)}>
      <div className="flex flex-col gap-2 min-w-[100%] h-[185px] items bg-background items-center animate-pulse border-border border-2 rounded-lg p-3">
        <div className="size-[100%] h-48 rounded-md bg-secondary animate-pulse" />
        <div className="w-full h-10 mt-2 rounded-md bg-secondary animate-pulse"></div>
      </div>
    </div>
  );
};
export const ProfileDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:gap-1  gap-4 md:flex-row w-full h-full  items-center justify-center  min-h-full md:px-0 px-4">
      <form className="flex w-full items-center md:flex-row flex-col justify-center">
        <div className="flex items-center gap-1 w-max md:order-1   self-start">
          <Edit className="ml-1 cursor-pointer " />
          <Button className="invisible">Update</Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center w-max justify-between">
            <label htmlFor="firstName" className="w-24">
              First name
            </label>

            <Input disabled type="text" className="min-w-0 w-min" />
          </div>
          <div className="flex items-center w-max justify-between">
            <label htmlFor="lastName" className="w-24">
              Last name
            </label>
            <Input disabled type="text" className="w-min  min-w-0" />
          </div>
          <div className="flex items-center w-max justify-between">
            <label htmlFor="password" className="w-24">
              Password
            </label>
            <Input disabled type="text" className="w-min min-w-0" />
          </div>
          <div className="flex items-center w-max justify-between">
            <label htmlFor="phoneNumber" className="w-24">
              Phone number
            </label>
            <Input disabled type="text" className="w-min min-w-0" />
          </div>
          <div className="flex items-center w-max justify-between">
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
