import { useQuery } from "@tanstack/react-query";
import baseApi from "@/services/baseApi";
import { MovieNowPlayingResponse } from "moviedb-promise";

const fetchNowPlaying = async (): Promise<MovieNowPlayingResponse> => {
  try {
    const response = await baseApi.get<MovieNowPlayingResponse>(
      "/api/tmdb/now-playing"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useNowPlayingData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["now-playing"],
    queryFn: fetchNowPlaying,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
};
