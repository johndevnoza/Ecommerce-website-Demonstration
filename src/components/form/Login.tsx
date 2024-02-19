// login
import { z } from "zod";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";
import axios from "../../services/baseURLAxios";
import { useUserStore } from "@/services/authContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;
const LOGIN_URL = "auth/login";

const Login = () => {
  const { login } = useUserStore();
  const navigate = useNavigate();

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
      console.log(token);
      if (token) {
        login();
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
      setError("root", {
        message: "ragac errori",
      });
    }
  };

  return (
    <MaxWidthWrapper>
      <Card>
        <form
          className="flex flex-col  gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input {...register("email")} type="text" placeholder="Email" />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Login;
