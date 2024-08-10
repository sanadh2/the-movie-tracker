import { QueryKey, useQuery } from "@tanstack/react-query";
import searchMovies from "../../services/search-movies";
export default function useSearchData(search: string = "", queryKey: QueryKey) {
  const { data, isLoading, error } = useQuery({
    enabled: !!search,
    queryKey: queryKey,
    queryFn: () => searchMovies(search),
  });
  return { data, error, isLoading };
}
