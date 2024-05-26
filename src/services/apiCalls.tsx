import { loginAxios } from "./baseURLAxios";
import { NavigateFunction } from "react-router-dom";
const LOGIN_URL = "auth/login";
const REGISTER_URL = "auth/register";

export const postRegister = async (data: User) => {
  const response = await loginAxios.post(REGISTER_URL, {
    email: data.email,
    password: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number,
  });
  return response;
};

export const mutateLogin = async (
  data: LoginProps,
  navigate: NavigateFunction
) => {
  let errorOccurred = false;

  return await loginAxios
    .post(LOGIN_URL, {
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
      }
    })
    .catch((error) => {
      if (error) errorOccurred = true;
      console.log(error.message);
      throw new Error("Invalid email or password");
    })
    .finally(() => {
      if (!errorOccurred) {
        navigate("/");
      }
    });
};
