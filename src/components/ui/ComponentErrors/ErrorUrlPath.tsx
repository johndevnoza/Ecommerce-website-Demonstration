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
      <div className="w-full border-border border-2 justify-center gap-4 rounded-md h-56 my-10 flex flex-col items-center">
        <span className="text-4xl mt-2 text-destructive font-bold font-mono">
          Path Not Found
        </span>
        <div className="flex gap-2 items-center w-full justify-center">
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
                className: "font-mono tabular-nums text-2xl",
              })
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
