// register
import { z } from "zod";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";
import {
  Component,
  Mail,
  MailCheck,
  Phone,
  PhoneCall,
  User,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRegister } from "@/services/apiCalls";
import { useEffect } from "react";
import { getAccesToken } from "@/services/baseURLAxios";
export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string().min(2).max(16),
  last_name: z.string().min(2).max(16),
  phone_number: z
    .string()
    .refine((value) => /^(\+?995\-?|0)?(5|7|8)\d{8}$/.test(value), {
      message: "Invalid Georgian phone number format",
    }),
});

type FormFields = z.infer<typeof schema>;
const Register = () => {
  const navigate = useNavigate();
  const isLoggedIn = getAccesToken();
  console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) return navigate("/");
  }, []);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });
  const handleRegister = useMutation({
    mutationFn: async (data: User) => postRegister(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["access_token"] });
    },
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      handleRegister.mutate(data);
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <MaxWidthWrapper className="grid place-items-center">
      <div className="md:w-[50%] flex flex-col mt-10 mb-44 p-2  rounded-lg gap-4 bg-card border-border border-2">
        <h2 className="m-auto font-bold">Register</h2>
        <form
          className="flex flex-col    gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex lg:flex-row flex-col gap-1">
            <div className="flex lg:w-1/2 flex-col gap-1 relative">
              <Input
                className=""
                {...register("first_name")}
                type="text"
                placeholder="First name"
              />
              {!errors.first_name ? (
                <UserCheck className="absolute right-2  top-2" />
              ) : (
                <User className="absolute right-2 animate-pulse  top-2" />
              )}
              {errors.first_name && (
                <div className="text-red-500">{errors.first_name.message}</div>
              )}
            </div>
            <div className="flex relative lg:w-1/2 flex-col  gap-1">
              <Input
                {...register("last_name")}
                type="text"
                placeholder="Last name"
              />
              {!errors.last_name ? (
                <UserCheck className="absolute right-2 top-2" />
              ) : (
                <User className="absolute right-2 animate-pulse top-2" />
              )}
              {errors.last_name && (
                <div className="text-red-500">{errors.last_name.message}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-1 w-full">
            <div className="flex relative flex-col lg:w-1/2 gap-1">
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              {!errors.password ? (
                <Component className="absolute right-2 top-2" />
              ) : (
                <Component className="absolute right-2 animate-bounce top-2" />
              )}
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <div className="flex relative lg:w-1/2 flex-col gap-1">
              <Input
                {...register("phone_number")}
                type="text"
                placeholder="Phone Number"
              />
              {!errors.phone_number ? (
                <PhoneCall className="absolute right-2  top-2" />
              ) : (
                <Phone className="absolute right-2 animate-pulse  top-2" />
              )}
              {errors.phone_number && (
                <div className="text-red-500">
                  {errors.phone_number.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex relative flex-col gap-1">
            <Input {...register("email")} type="text" placeholder="Email" />
            {!errors.email ? (
              <MailCheck className="absolute right-2  top-2" />
            ) : (
              <Mail className="absolute right-2 animate-pulse  top-2" />
            )}
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Register"}
          </Button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
        <div className="flex  gap-1 items-center justify-center">
          <p>Have an Account? </p>
          <Link
            className={cn(buttonVariants({ variant: "secondary" }))}
            to={"/login"}
          >
            Log in
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Register;
