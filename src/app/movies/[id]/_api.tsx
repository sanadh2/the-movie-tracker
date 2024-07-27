import axios, { AxiosResponse } from "axios";

export async function getIswatchlisted(tmdbID: number) {
  try {
    const response: AxiosResponse<{
      watched: {
        id: string;
        movieID: number;
        userID: string;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    }> = await axios.get(`/api/watchlists/movie`, {
      params: { tmdbID },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist status:", error);
    throw error;
  }
}
type PostWatchlists = {
  tmdbID: number;
  title: string;
  poster: string;
  rating: number;
};
export async function postWatchlists(movie: PostWatchlists) {
  try {
    const response = await axios.post(`/api/watchlists/movie`, movie);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist status:", error);
    throw error;
  }
}

export async function deleteWatchlist(tmdbID: number) {
  try {
    const response = await axios.delete(`/api/watchlists/movie`, {
      params: { tmdbID },
    });
    return response.data;
  } catch (error) {
    console.error("Error while  watchlist", error);
    throw error;
  }
}
