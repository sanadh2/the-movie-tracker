import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieNowPlayingResponse } from "moviedb-promise";

const fetchNowPlaying = async (): Promise<MovieNowPlayingResponse> => {
  try {
    const response = await axios.get<MovieNowPlayingResponse>(
      "/api/now-playing"
    );
    return response.data;
  } catch (error) {
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
