import { useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "../button";
import { cn } from "@/lib/utils";

const ErrorUrlPath = () => {
  const navigate = useNavigate();
  const [second, setSecond] = useState(5);
  const intervalId = setInterval(() => {
    setSecond(second - 1);
  }, 1000);
  if (second === 0) {
    clearInterval(intervalId);
    navigate("/");
  }

  return (
    <MaxWidthWrapper>
      <div className="my-10 flex h-56 w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-border">
        <span className="mt-2 font-mono text-4xl font-bold text-destructive">
          Path Not Found
        </span>
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            onClick={() => navigate(-1)}
            className="text-2xl"
            variant={"secondary"}
          >
            Go Back
          </Button>
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "font-mono text-2xl tabular-nums",
              }),
            )}
          >
            Redirecting in : {second}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ErrorUrlPath;
