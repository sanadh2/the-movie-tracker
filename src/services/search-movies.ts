import axios from "axios";
export type SearchResults = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type FetchData = {
  page: number;
  total_pages: number;
  total_results: number;
  results: SearchResults[];
};
export default async function searchMovies(query: string): Promise<FetchData> {
  const options = {
    method: "GET",
    url: "/api/search",
    params: {
      query: query,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2IyM2Q5NWRjZGVmMjFjYTJmZWExOGIzOWFiZWFkMSIsIm5iZiI6MTcyMjEwOTA3OS43NDc5NzEsInN1YiI6IjY2NmRlZmFhYWUxZDRiOTQ3NDZkYjU5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAcxqBvSVobfu7sQpw_EmxLS4yFkAuA4Tl-K5eQU3x4",
    },
  };

  return (await axios.request(options)).data;
}
