import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleAxiosError } from "@/lib/error-toast";
import { reviewTable } from "@/db/schema/movie";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { useSession } from "next-auth/react";
type InsertReviewType = InferInsertModel<typeof reviewTable>;
type ReviewType = InferSelectModel<typeof reviewTable>;
const fetchReviewsApi = async (movieID: number) => {
  try {
    const { data } = await axios.get<{ reviews: ReviewType[] }>(
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

export const addReviewApi = async (data: InsertReviewType) => {
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
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (data: InsertReviewType) => addReviewApi(data),
    onMutate: async (data: InsertReviewType) => {
      if (!session || !session.user || !session.user.id) return;
      await queryClient.cancelQueries({
        queryKey: ["movie-reviews", movieID],
      });
      const previousReviews = queryClient.getQueryData<ReviewType[]>([
        "movie-reviews",
        movieID,
      ]);
      if (previousReviews) {
        const newReview: ReviewType = {
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          reviewer: session.user.name || "",
          userID: session.user.id,
          rating: data.rating,
          comment: data.comment || "",
          tmdbID: data.tmdbID,
        };
        queryClient.setQueryData<ReviewType[]>(
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
      const previousReviews = queryClient.getQueryData<ReviewType[]>([
        "movie-reviews",
        movieID,
      ]);
      if (previousReviews) {
        queryClient.setQueryData<ReviewType[]>(
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
