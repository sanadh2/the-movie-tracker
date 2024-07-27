import fetchWithAuth from "@/lib/fetch-with-auth";

export async function fetchMovie(id: string): Promise<Response> {
  const response = await fetchWithAuth(`/movie/${id}`);
  return response;
}
