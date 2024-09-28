"use client";
import { useForm } from "react-hook-form";
import { SignUpData, signUpSchema } from "../schemas-types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = (data: SignUpData) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center min-h-[70vh] p-3">
      <div className="flex flex-col justify-center items-center p-2 md:p-8 border max-w-[40rem] w-[90%] rounded-lg space-y-3 md:space-y-5 text-xl">
        <h2 className="text-lg lg:text-2xl">Sign Up</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 md:space-y-4 text-sm w-[90%]"
        >
          <div className="flex gap-3 justify-center md:items-center flex-col md:flex-row">
            <label htmlFor="name" className="whitespace-nowrap">
              full name{" "}
            </label>
            <input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              type="text"
              className="bg-inherit border rounded-md h-10 p-3 w-full"
            />
          </div>
          <p className="text-red-500 text-xs">{errors.name?.message}</p>
          <div className="flex gap-3 justify-center md:items-center flex-col md:flex-row">
            <label htmlFor="email" className="whitespace-nowrap">
              email-Id:
            </label>
            <input
              id="email"
              placeholder="YXrJt@example.com"
              {...register("email")}
              type="text"
              className="bg-inherit border rounded-md h-10 p-3 w-full"
            />
          </div>
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
          <div className="flex gap-3 justify-center md:items-center flex-col md:flex-row">
            <label htmlFor="username">username:</label>
            <input
              id="username"
              placeholder="johndoe"
              {...register("username")}
              type="text"
              className="bg-inherit border rounded-md h-10 p-3 w-full"
            />
          </div>
          <p className="text-red-500 text-xs">{errors.username?.message}</p>
          <div className="flex gap-3 justify-center md:tems-center flex-col md:flex-row">
            <label htmlFor="password">password:</label>
            <input
              type="password"
              {...register("password")}
              id="password"
              className="bg-inherit border rounded-md h-10 p-3 w-full"
              placeholder="••••••••"
            />
          </div>
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
          <div className="flex gap-3 justify-center md:tems-center flex-col md:flex-row">
            <label htmlFor="confirm-password">confirm password:</label>
            <input
              type="password"
              {...register("confirmPassword")}
              id="confirm-password"
              className="bg-inherit border rounded-md h-10 p-3 w-full"
              placeholder="••••••••"
            />
          </div>
          <p className="text-red-500 text-xs">
            {errors.confirmPassword?.message}
          </p>
          <div className="w-full flex flex-col gap-3 items-center py-4 ">
            <div className="w-full">
              <button
                type="submit"
                className="p-1 rounded-lg border w-full h-10"
              >
                Login
              </button>
            </div>
            <p className="">Or</p>
            <div className=" w-full">
              <Link
                href={"http://localhost:5000/auth/google"}
                type="button"
                className="p-1 rounded-lg border w-full flex justify-center items-center gap-4 h-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                sign in with google
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
