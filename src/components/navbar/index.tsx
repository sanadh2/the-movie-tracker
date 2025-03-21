import SearchFilms from "./search-films";
import { BarChart2 } from "lucide-react";
import VisuallyHidden from "@/components/ui/visually-hidden";
import { auth } from "@/auth";
import { Sidebar } from "../siderbar";
import { SuperLink } from "../super-link";
export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="sticky top-full container text-neutral-300 ">
      <nav className="p-3 border-b border-secondary flex gap-10 justify-between items-center bg-transparent relative z-2">
        <div className="flex gap-5 items-center">
          <>
            <SuperLink
              href={"/"}
              className="hidden font-mono tracking-tighter lg:block font-semibold text-xl p-2 text-white "
            >
              The Movie Tracker
            </SuperLink>
            <SuperLink
              href={"/"}
              className="lg:hidden block font-semibold text-xl p-2 text-white"
            >
              TMT
            </SuperLink>
          </>
          <p className="hidden lg:block text-sm font-medium text-neutral-400">
            Discover. Review. Connect.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SearchFilms />
          <div className="flex gap-2 items-center">
            <SuperLink
              href={"/trending"}
              className="flex items-center hover:text-white transition-colors"
            >
              <span className="font-semibold hidden lg:block">Trending</span>
              <span className="lg:hidden">
                <BarChart2 strokeWidth={4} />
                <VisuallyHidden>Trending</VisuallyHidden>
              </span>
            </SuperLink>
            <SuperLink
              href={"/movie-search"}
              className="flex items-center hover:text-white transition-colors"
            >
              <span className="font-semibold hidden lg:block">
                Browse-Movies
              </span>
              <span className="lg:hidden">
                <BarChart2 strokeWidth={4} />
                <VisuallyHidden>Search Movies</VisuallyHidden>
              </span>
            </SuperLink>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <Sidebar user={user} />
            </div>
          ) : (
            <SuperLink
              href={"/auth/signin"}
              className="px-2 py-1 rounded bg-green-700 hover:bg-green-800 hover:text-white transition-colors font-semibold"
            >
              Sign In
            </SuperLink>
          )}
        </div>
      </nav>
    </div>
  );
}
