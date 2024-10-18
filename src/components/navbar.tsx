import Link from "next/link";
import SearchFilms from "@/features/search-films";
import { BarChart2 } from "lucide-react";
import VisuallyHidden from "./ui/visually-hidden";
import SignInButton from "./sign-in-button";
import SignOutButton from "./sign-out-button";
import { signIn, auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  return (
    <nav className="p-3 border-b flex gap-10 justify-between items-center bg-transparent relative z-10 ">
      <div className="flex gap-5 items-center">
        <>
          <Link
            href={"/"}
            className="hidden font-mono tracking-tighter lg:block font-semibold text-xl p-2"
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
          <div className="flex items-center gap-2">
            <SignOutButton user={user} />
          </div>
        ) : (
          <SignInButton
            signIn={async () => {
              "use server";
              await signIn();
            }}
          >
            Login
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
