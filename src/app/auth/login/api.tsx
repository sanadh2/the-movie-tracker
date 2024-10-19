import { requestHandler } from "@/lib/requestHandler";
import baseApi from "@/services/baseApi";
import { LoginData } from "../schemas-types";

export const loginApi = requestHandler<LoginData, undefined>((loginData) =>
  baseApi.post("/api/authentication/login", loginData)
);

export const signupApi = requestHandler<LoginData, undefined>(() =>
  baseApi.post("/api/authentication/signup")
);
