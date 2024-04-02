import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import React from "react";

const Sales = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-2xl">Best offers </h1>
        <span className="self-center animate-pulse text-primary">
          PRODUCTION IN PROGRESS
        </span>
        <div className="grid md:grid-cols-3 gap-y-6 grid-cols-2 gap-x-6 lg:grid-cols-4  lg:gap-x-2"></div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Sales;
