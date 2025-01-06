import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import baseApi from "@/services/baseApi";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { Review, InsertReview } from "@/db/schema/movie";
type ReviewResponse = {
  reviews: Review[];
  message: string;
};

export const useReviews = (tmdbID: string | number) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userID = session?.user?.id;

  const fetchReview = async (): Promise<ReviewResponse> => {
    console.log("Connecting to:", "/api/reviews/movies/" + tmdbID);
    const response = await fetch("/api/reviews/movies/" + tmdbID);
    return await response.json();
  };

  const addReview = async (movie: InsertReview) => {
    return await baseApi.post("/api/reviews", movie);
  };

  const deleteReview = async (reviewID: string) => {
    return await baseApi.delete("/api/reviews/" + reviewID);
  };
  const { data, error, isLoading } = useQuery<ReviewResponse>({
    enabled: !!userID,
    queryFn: fetchReview,
    queryKey: ["reviews", userID, tmdbID],
  });

  const mutationAdd = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", userID, tmdbID] });
    },
    onError: (error: Error) => {
      console.error("Error adding review:", error);
      toast({
        title: "Error",
        description: "Error adding review",
        variant: "destructive",
      });
    },
  });

  const mutationRemove = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", userID, tmdbID] });
    },
    onError: (error) => {
      console.error("Error removing review:", error);
      toast({
        title: "Error",
        description: "Error removing review",
        variant: "destructive",
      });
    },
  });
  return {
    reviews: data?.reviews || [],
    isLoading,
    error,
    mutationAdd,
    mutationRemove,
  };
};
