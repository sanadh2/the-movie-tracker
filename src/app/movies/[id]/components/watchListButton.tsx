"use client";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Bookmark } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApiQuery } from "../use-api-query-hook";

interface Props {
  movie: {
    id: number;
    poster_path: string;
    title: string;
    vote_average: number;
  };
}
export function WatchlistButton({ movie }: Props) {
  const { id, poster_path, title, vote_average } = movie;
  const user = useKindeBrowserClient().getUser();
  const { deleteMutation, postMutation, query } = useApiQuery(
    { tmdbID: id, poster: poster_path, title: title, rating: vote_average },
    user?.id
  );

  const handleClick = () => {
    if (query.isLoading || !user || !queryData) return;

    if (queryData.watched) {
      deleteMutation.mutate();
    } else {
      postMutation.mutate();
    }
  };

  const queryData = query.data;
  return user ? (
    <Button
      variant={queryData?.watched ? "positive" : "default"}
      className="gap-3 rounded-full md:w-48"
      onClick={handleClick}
    >
      {!query.isLoading ? (
        queryData?.watched ? (
          <>
            <span className="hidden md:block">remove from Watchlist</span>
            <Bookmark className="fill-current" />
          </>
        ) : (
          <>
            <span className="hidden md:block">Add To watchlist</span>
            <Bookmark />
          </>
        )
      ) : (
        "Loading...."
      )}
    </Button>
  ) : (
    <NotLoggedIn />
  );
}

const NotLoggedIn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full gap-3 md:w-48">
          <span className="hidden md:block">Add To watchlist</span>
          <Bookmark />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500 text-2xl">
            You Are Not Signed In
          </DialogTitle>
          <DialogDescription>Please sign in to continue</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild variant={"outline"}>
            <LoginLink postLoginRedirectURL="">Sign In</LoginLink>
          </Button>
          <Button asChild variant={"secondary"}>
            <RegisterLink postLoginRedirectURL="">Sign Up</RegisterLink>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
