import React from "react";
import { twMerge } from "tailwind-merge";

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
