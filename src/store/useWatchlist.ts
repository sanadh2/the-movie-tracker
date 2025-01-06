import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import baseApi from "@/services/baseApi";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";

interface Movie {
  id: string;
  tmdbID: number | string;
  createdAt?: Date | null;
  updatedAt?: Date;
  title: string;
  posterPath: string;
}
[];

interface WatchlistApiResponse {
  watchlist: Movie[];
  message: string;
}

export const useWatchlist = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userID = session?.user?.id;

  const fetchWatchlist = async (): Promise<WatchlistApiResponse> => {
    console.log("Connecting to:", "/api/watchlist");
    const response = await fetch(`/api/watchlist`);
    return await response.json();
  };

  const addToWatchlist = async (movie: {
    poster: string;
    title: string;
    tmdbID: number | string;
  }) => {
    await baseApi.post("/api/watchlist/movie", {
      poster: movie.poster,
      title: movie.title,
      tmdbID: movie.tmdbID,
    });
  };

  const removeFromWatchlist = async (tmdbID: number | string) => {
    await baseApi.delete("/api/watchlist/movie", {
      params: {
        tmdbID: tmdbID,
      },
    });
  };

  const { data, isLoading, error, isRefetching } =
    useQuery<WatchlistApiResponse>({
      enabled: !!userID,
      queryFn: fetchWatchlist,
      queryKey: ["watchlist", userID],
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  const mutationAdd = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist", userID] });
    },
    onError: (error: Error) => {
      console.error("Error adding movie to watchlist:", error);
      toast({
        title: "Error",
        description: "Error adding movie to watchlist",
        variant: "destructive",
      });
    },
  });

  const mutationRemove = useMutation({
    mutationFn: removeFromWatchlist,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist", userID] });
    },
    onError: (error) => {
      console.error("Error removing movie from watchlist:", error);
      toast({
        title: "Error",
        description: "Error removing movie from watchlist",
        variant: "destructive",
      });
    },
  });

  return {
    watchList: data?.watchlist || [],
    isLoading,
    error,
    mutationAdd,
    mutationRemove,
    isRefetching,
  };
};
