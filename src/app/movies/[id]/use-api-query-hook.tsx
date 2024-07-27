import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteWatchlist, getIswatchlisted, postWatchlists } from "./_api";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";

type MovieDataRequired = {
  tmdbID: number;
  title: string;
  poster: string;
  rating: number;
};
export function useApiQuery(
  { title, tmdbID, poster, rating }: MovieDataRequired,
  userID: string | null | undefined
) {
  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["todos", tmdbID, userID];
  // console.log(tmdbID);
  const query = useQuery({
    queryKey,
    queryFn: () => getIswatchlisted(tmdbID),
  });

  const postMutation = useMutation({
    mutationFn: () => postWatchlists({ tmdbID, poster, rating, title }),
    onSuccess: () => {
      toast({
        description: title + " added to your watchlist",
        className: "text-green-700 dark:text-green-500",
        action: (
          <ToastAction altText="Go to watchlist" className="text-blue-500">
            <Link href={"/my-watchlist"}>Watchlist</Link>
          </ToastAction>
        ),
      });
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteWatchlist(tmdbID),
    onSuccess: () => {
      toast({
        description: title + " removed from your watchlist",
        className: "text-red-600 dark:text-red-500",
        action: (
          <ToastAction altText="Go to watchlist" className="text-blue-500">
            <Link href={"/my-watchlist"}>Watchlist</Link>
          </ToastAction>
        ),
      });
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return { query, postMutation, deleteMutation };
}
