// register
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/services/authContext";
import { SubmitHandler, useForm } from "react-hook-form";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  phone_number: z.string().min(9),
});
type FormFields = z.infer<typeof schema>;

const Register = () => {
  const { login, registerUser } = useUserStore();
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await registerUser(data);
      login();
      navigate("/login");
    } catch (error) {
      error;
    }
  };

  return (
    <MaxWidthWrapper className="grid place-items-center">
      <div className="w-[50%] flex flex-col mt-10 mb-44 p-2  rounded-lg gap-4 bg-card">
        <h2 className="m-auto font-bold">Register</h2>
        <form
          className="flex flex-col    gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex lg:flex-row flex-col gap-1">
            <div className="flex lg:w-1/2 flex-col gap-1">
              <Input
                {...register("first_name")}
                type="text"
                placeholder="First name"
              />
              {errors.first_name && (
                <div className="text-red-500">{errors.first_name.message}</div>
              )}
            </div>
            <div className="flex lg:w-1/2 flex-col lg:flex-row gap-1">
              <Input
                {...register("last_name")}
                type="text"
                placeholder="Last name"
              />
              {errors.last_name && (
                <div className="text-red-500">{errors.last_name.message}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-1 w-full">
            <div className="flex flex-col lg:w-1/2 gap-1">
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <div className="flex lg:w-1/2 flex-col gap-1">
              <Input
                {...register("phone_number")}
                type="text"
                placeholder="Phone Number"
              />
              {errors.phone_number && (
                <div className="text-red-500">
                  {errors.phone_number.message}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Input {...register("email")} type="text" placeholder="Email" />
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
          <Button variant={"secondary"}>Log in</Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Register;
