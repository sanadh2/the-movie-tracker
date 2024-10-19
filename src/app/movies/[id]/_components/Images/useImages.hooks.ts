"use client";

import { useQuery } from "@tanstack/react-query";
import baseApi from "@/services/baseApi";
import { MovieImagesResponse } from "moviedb-promise";

const fetchNowPlaying = async (
  id: string | number
): Promise<MovieImagesResponse> => {
  try {
    const response = await baseApi.get<MovieImagesResponse>(
      "/api/tmdb/movie-images",
      {
        params: {
          id,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default function useImages(id: string | number) {
  return useQuery({
    queryKey: ["movie-images", id],
    queryFn: () => fetchNowPlaying(id),
  });
}
