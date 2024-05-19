import { authAxios } from "./baseURLAxios";
import { NavigateFunction } from "react-router-dom";
const LOGIN_URL = "auth/login";
const REGISTER_URL = "auth/register";

export const postRegister = async (data: User) => {
  const response = await authAxios.post(REGISTER_URL, {
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

  return await authAxios
    .post(LOGIN_URL, {
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.access_token);
    })
    .catch((error) => {
      errorOccurred = true;
      throw new Error("Invalid email or password");
    })
    .finally(() => {
      if (!errorOccurred) {
        navigate("/");
      }
    });
};
