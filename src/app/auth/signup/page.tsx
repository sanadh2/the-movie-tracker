"use client";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import SigninForm from "./form";
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 24 24"
                    width="18"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                )}
              </span>
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
