// login
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";
import axios from "../../services/baseURLAxios";
import { useUserStore } from "@/services/authContext";
import { Component, Mail, MailCheck } from "lucide-react";
// validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;
const LOGIN_URL = "auth/login";

const Login = () => {
  const { login } = useUserStore();
  const navigate = useNavigate();

  // validation with zod and react useForm
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        email: data.email,
        password: data.password,
      });

      const token = response.data.access_token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("accessToken", token);
      if (token) {
        login();
        navigate("/");
      }
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  return (
    <MaxWidthWrapper className="mt-10 mb-44">
      <form
        className="flex flex-col w-80 rounded-lg bg-card m-auto p-4 gap-2"
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
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Log in"}
          </Button>
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
