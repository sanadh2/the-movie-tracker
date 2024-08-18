import { SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import SearchFilms from "@/features/search-films";
import { BarChart2 } from "lucide-react";
import VisuallyHidden from "./ui/visually-hidden";
import Image from "next/image";
import { Separator } from "./ui/separator";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="p-3 border-b flex gap-10 justify-between items-center bg-transparent relative z-10">
      <div className="flex gap-5 items-center">
        <>
          <Link
            href={"/"}
            className="hidden lg:block font-semibold text-xl p-2"
          >
            The Movie Tracker
          </Link>
          <Link
            href={"/"}
            className="lg:hidden block font-semibold text-xl p-2"
          >
            TMT
          </Link>
        </>
        <p className="hidden lg:block text-sm font-medium text-neutral-500">
          Discover. Review. Connect.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <SearchFilms />
        <div className="">
          <Link href={"/trending"} className="flex items-center">
            <span className="font-semibold hidden lg:block">Trending</span>
            <span className="lg:hidden">
              <BarChart2 strokeWidth={4} />
              <VisuallyHidden>Trending</VisuallyHidden>
            </span>
          </Link>
        </div>
        {user ? (
          <>
            <div className="flex items-center relative size-10 rounded-full overflow-hidden">
              <Image
                fill
                alt="profile pic"
                src={user.imageUrl || ""}
                sizes="(40px)"
              />
            </div>
            <SignOutButton />
          </>
        ) : (
          <div className="flex items-center h-5 space-x-3 overflow-hidden">
            <SignUpButton>Register</SignUpButton>
            <Separator orientation="vertical" className="bg-neutral-400" />
            <SignInButton>Sign In</SignInButton>
          </div>
        )}
      </div>
    </nav>
  );
}
