import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Review } from "@prisma/client";
import { handleAxiosError } from "@/lib/error-toast";
import { useAuth } from "@/app/contexts/auth-context";

const fetchReviewsApi = async (movieID: number) => {
  try {
    const { data } = await axios.get<{ reviews: Review[] }>(
      "/api/reviews/movies/" + movieID
    );
    return data.reviews;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
export function useReviewsData(movieID: number) {
  return useQuery({
    queryKey: ["movie-reviews", movieID],
    queryFn: () => fetchReviewsApi(movieID),
  });
}

type AddReviewData = {
  rating: number;
  tmdbID: number;
  comment?: string;
};
export const addReviewApi = async (data: AddReviewData) => {
  try {
    const response = await axios.post("/api/reviews", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export function useAddReview(movieID: number) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: AddReviewData) => addReviewApi(data),
    onMutate: async (data: AddReviewData) => {
      if (!user) return;
      await queryClient.cancelQueries({
        queryKey: ["movie-reviews", movieID],
      });
      const previousReviews = queryClient.getQueryData<Review[]>([
        "movie-reviews",
        movieID,
      ]);
      if (previousReviews) {
        const newReview: Review = {
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          name: user.name,
          userID: user.id,
          username: user.name || "",
          rating: data.rating,
          comment: data.comment || "",
          tmdbID: data.tmdbID,
        };
        queryClient.setQueryData<Review[]>(
          ["movie-reviews", movieID],
          [...previousReviews, newReview]
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movie-reviews", movieID],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["movie-reviews", movieID],
      });
    },
  });
}

const deleteReviewApi = async (reviewID: string) => {
  try {
    const { data } = await axios.delete("/api/reviews/" + reviewID);
    return data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export function useDeleteReview(movieID: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewID: string) => deleteReviewApi(reviewID),
    onMutate: async (reviewID: string) => {
      await queryClient.cancelQueries({
        queryKey: ["movie-reviews", movieID],
      });
      const previousReviews = queryClient.getQueryData<Review[]>([
        "movie-reviews",
        movieID,
      ]);
      if (previousReviews) {
        queryClient.setQueryData<Review[]>(
          ["movie-reviews", movieID],
          previousReviews.filter((review) => review.id !== reviewID)
        );
      }
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["movie-reviews", movieID],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["movie-reviews", movieID],
      });
    },
  });
}
