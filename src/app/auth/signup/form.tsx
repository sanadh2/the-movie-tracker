"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { SignUpData, signUpSchema } from "./zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { redirect } from "next/navigation";

export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });
  const [step, setStep] = useState<1 | 2>(1);
  const submitData: SubmitHandler<SignUpData> = async (data) => {
    try {
      const response = await axios.post("/api/auth/sign-up", data);
      console.log(response);
      toast({
        description: response.data.message || "Something went wrong",
      });
      setStep(2);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response)
          toast({
            variant: "destructive",
            description: error.response.data.message || "Something went wrong",
          });
      }
      console.error(error);
    }
  };
  const otp = watch("otp");
  const submitOTP: SubmitHandler<SignUpData> = async (data) => {
    try {
      if (!data.otp) {
        setError("otp", {
          message: "Please enter OTP",
        });
        return;
      }
      const response = await axios.post("/api/auth/verify-user", {
        email: data.email,
        otp: data.otp,
      });
      console.log(response);
      toast({
        description: response.data.message || "Something went wrong",
      });
      redirect("/auth/signin");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response)
          toast({
            variant: "destructive",
            description: error.response.data.message || "Something went wrong",
          });
      }
      console.error(error);
    }
  };

  return step == 1 ? (
    <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-4">
      <div className="">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            className="rounded h-10 bg-inherit border px-3"
            type="email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div className="">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Name"
            className="rounded h-10 bg-inherit border px-3"
            type="text"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="*******"
            className="rounded h-10 bg-inherit border px-3"
            type="password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>
      {errors.root && (
        <p className="text-red-500 text-xs">{errors.root.message}</p>
      )}
      <button className="bg-blue-500 border p-2 rounded-md">Sign Up</button>
      <Link
        href={"/auth/signin"}
        className="border p-2 rounded-md bg-green-500 text-center"
      >
        Sign in
      </Link>
    </form>
  ) : (
    <form onSubmit={handleSubmit(submitOTP)} className="flex flex-col gap-4">
      <div className="">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            className="rounded h-10 bg-inherit border px-3"
            type="email"
            {...register("email")}
            readOnly
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>
      <InputOTP
        maxLength={6}
        value={otp}
        required
        onChange={(e) => setValue("otp", e)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {errors.otp && (
        <p className="text-red-500 text-xs">{errors.otp.message}</p>
      )}
      <button className="bg-blue-500 border p-2 rounded-md">Sign Up</button>
      <Link
        href={"/auth/signin"}
        className="border p-2 rounded-md bg-green-500 text-center"
      >
        Sign in
      </Link>
    </form>
  );
}
