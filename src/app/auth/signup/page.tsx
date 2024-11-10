"use client";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import SigninForm from "./form";
import Image from "next/image";
import GoogleImage from "../../../../public/google-icon.png";
import { useSession, signIn } from "next-auth/react";
const providerMap: {
  id: string;
  name: string;
  icon: "github" | "google";
}[] = [
  {
    id: "github",
    name: "Github",
    icon: "github",
  },
  {
    id: "google",
    name: "Google",
    icon: "google",
  },
];
export default function SignInPage() {
  const session = useSession().data;
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="h-[80dvh] font-mono flex flex-col justify-center items-center">
      <h2 className="text-3xl ">Sign In</h2>
      <div className="flex  mt-10 flex-col gap-4 justify-center items-center border p-8 rounded-md ">
        <SigninForm />
        {providerMap.map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              try {
                await signIn(provider.id);
              } catch (error) {
                if (error instanceof AuthError) {
                  toast({
                    variant: "destructive",
                    description: error.message,
                  });
                }
                throw error;
              }
            }}
            className="w-full"
          >
            <button type="submit" className="border p-2 rounded-md w-full">
              <span className="font-mono flex items-center justify-center gap-2 ">
                Sign in with {provider.name}{" "}
                {provider.icon == "github" ? (
                  <GitHubLogoIcon />
                ) : (
                  <Image
                    alt="google image"
                    src={GoogleImage}
                    width={18}
                    height={18}
                  />
                )}
              </span>
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
