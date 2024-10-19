import { useQuery } from "@tanstack/react-query";
import baseApi from "@/services/baseApi";
import { MovieNowPlayingResponse } from "moviedb-promise";

const fetchUpcoming = async (): Promise<MovieNowPlayingResponse> => {
  try {
    const response = await baseApi.get<MovieNowPlayingResponse>(
      "/api/tmdb/upcoming"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useUpcomingData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["upcoming"],
    queryFn: fetchUpcoming,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
};
