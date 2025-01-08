import Link from "next/link";
import SearchFilms from "./search-films";
import { BarChart2 } from "lucide-react";
import VisuallyHidden from "@/components/ui/visually-hidden";
import SignInButton from "@/components/sign-in-button";
import { signIn, auth } from "@/auth";
import { Sidebar } from "../siderbar";
import { SuperLink } from "../super-link";
export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="sticky top-full container">
      <nav className="p-3 border-b border-secondary flex gap-10 justify-between items-center bg-transparent relative z-2">
        <div className="flex gap-5 items-center">
          <>
            <SuperLink
              href={"/"}
              className="hidden font-mono tracking-tighter lg:block font-semibold text-xl p-2"
            >
              The Movie Tracker
            </SuperLink>
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
          <div className="flex gap-2 items-center">
            <Link href={"/trending"} className="flex items-center">
              <span className="font-semibold hidden lg:block">Trending</span>
              <span className="lg:hidden">
                <BarChart2 strokeWidth={4} />
                <VisuallyHidden>Trending</VisuallyHidden>
              </span>
            </Link>
            <Link href={"/movie-search"} className="flex items-center">
              <span className="font-semibold hidden lg:block">
                Browse-Movies
              </span>
              <span className="lg:hidden">
                <BarChart2 strokeWidth={4} />
                <VisuallyHidden>Search Movies</VisuallyHidden>
              </span>
            </Link>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <Sidebar user={user} />
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
    </div>
  );
}
