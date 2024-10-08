import { QueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieResultsResponse } from "moviedb-promise";

const fetchNowPlaying = async (
  query: string
): Promise<MovieResultsResponse> => {
  try {
    const response = await axios.get<MovieResultsResponse>("/api/search", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default function useSearchData(search: string = "", queryKey: QueryKey) {
  const { data, isLoading, error } = useQuery({
    enabled: !!search,
    queryKey: queryKey,
    queryFn: () => fetchNowPlaying(search),
  });
  return { data, error, isLoading };
}
