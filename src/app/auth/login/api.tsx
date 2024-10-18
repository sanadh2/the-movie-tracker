import { requestHandler } from "@/lib/requestHandler";
import axios from "axios";
import { LoginData } from "../schemas-types";

export const loginApi = requestHandler<LoginData, undefined>((loginData) =>
  axios.post("/api/authentication/login", loginData)
);

export const signupApi = requestHandler<LoginData, undefined>(() =>
  axios.post("/api/authentication/signup")
);
