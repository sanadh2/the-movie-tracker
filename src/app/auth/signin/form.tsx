"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { LoginData, loginSchema } from "./zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

export default function SigninForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const user = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <div className="">
        <div className="flex justify-between w-full items-center gap-4 ">
          <label htmlFor="email" className="font-mono">
            Email
          </label>
          <input
            {...register("email")}
            placeholder="Email"
            name="email"
            id="email"
            type="email"
            className="rounded px-3 bg-inherit border h-10 font-mono"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center gap-4 font-mono">
          <label htmlFor="password" className="font-mono">
            Password
          </label>
          <input
            {...register("password")}
            placeholder="password"
            name="password"
            id="password"
            type="password"
            className="rounded px-3 bg-inherit border h-10 font-mono"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="border p-2 rounded-md bg-green-500"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
      <Link
        href={"/auth/signup"}
        className="border p-2 rounded-md bg-blue-500 text-center"
      >
        Sign Up
      </Link>
    </form>
  );
}
