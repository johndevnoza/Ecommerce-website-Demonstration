// login
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Component, Loader2Icon, Mail, MailCheck } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutateLogin } from "@/services/apiCalls";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";
// validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const handleLogin = useMutation({
    mutationFn: async (data: LoginProps) => await mutateLogin(data, navigate),
    onSettled: async () => {
      await queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      setError("root", {
        message: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    handleLogin.mutate(data);
  };

  return (
    <MaxWidthWrapper className="mt-10 mb-44">
      <form
        className="flex flex-col w-80 rounded-lg bg-card border-border border-2 m-auto p-4 gap-2 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="m-auto font-bold">Sign in</h2>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Input {...register("email")} type="text" placeholder="Email" />
            {!errors.email ? (
              <MailCheck className="absolute right-2  top-2" />
            ) : (
              <Mail className="absolute right-2 animate-pulse text-red-500 top-2" />
            )}
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="relative">
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {!errors.password ? (
              <Component className="absolute right-2 top-2" />
            ) : (
              <Component className="absolute right-2 animate-bounce  text-red-500 top-2" />
            )}
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <div className="w-full relative">
            <Button
              variant={isSubmitting ? "secondary" : "default"}
              disabled={handleLogin.isPending}
              className="w-full"
              type="submit"
            >
              {isSubmitting ? "Loading..." : "Log in"}
            </Button>
            {handleLogin.isPending ? (
              <Loader2Icon className="absolute top-2 right-24 animate-spin" />
            ) : null}
          </div>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
          <div className="flex justify-around items-center">
            <p>Dont have an Account?</p>
            <Button variant={"secondary"}>
              <Link to={"/register"}>Register</Link>
            </Button>
          </div>
        </div>
      </form>
    </MaxWidthWrapper>
  );
};

export default Login;
