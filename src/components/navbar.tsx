import { Search } from "lucide-react";
import { ToggelTheme } from "./toggle-theme";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import Logout from "./Logout";

export default async function Navbar() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  return (
    <nav className=" p-3 border-b lg:flex justify-between items-center hidden">
      <h1 className="font-bold text-2xl">
        <Link href={"/"}>The Movie Tracker</Link>
      </h1>
      <div className="relative">
        <input
          className="h-10 w-96 rounded-full pl-10 bg-input "
          placeholder="Search a movie or series"
        />
        <Search className="absolute left-3 size-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <div className="flex gap-3 items-center">
        <ToggelTheme />
        {isUserAuthenticated ? (
          <>
            <Image
              alt="avatar"
              src={user?.picture || ""}
              width={500}
              height={500}
              className="size-10 rounded-full object-cover border"
            />
            <Logout />
          </>
        ) : (
          <>
            <Button asChild variant={"outline"}>
              <LoginLink postLoginRedirectURL="/">Sign in</LoginLink>
            </Button>
            <Button asChild variant={"default"}>
              <RegisterLink postLoginRedirectURL="/">Sign up</RegisterLink>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
