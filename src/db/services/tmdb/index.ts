import { cache } from "react";
import { env } from "@/lib/env";
import {
  Person,
  MoviesNowPlayingType,
  MovieType,
  MoviesNowPlayingWithoutDates,
} from "./types";
import { redis } from "@/db/redis";

const API_KEY = env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchWithErrorHandling = async <T>(endpoint: string): Promise<T> => {
  const url = `${BASE_URL}${endpoint}&api_key=${API_KEY}`;

  const response = await fetch(url, {
    next: {
      revalidate: 7200,
    },
  });

  if (!response.ok) {
    console.error(`Error--> ${response.status}: ${response.statusText}`);
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  try {
    const text = await response.text();

    if (!text) {
      console.error("Received an empty response from the server.");
      throw new Error("Empty response from the server");
    }

    const json = JSON.parse(text);
    return json as T;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    throw new Error("Failed to parse JSON response");
  }
};

export const fetchMovieById = cache(
  async (id: number | string): Promise<MovieType> => {
    const cacheKey = `tmdb-movies-${id}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData) as MovieType;

    const endpoint = `/movie/${id}?append_to_response=credits,videos,images`;
    const data = await fetchWithErrorHandling<MovieType>(endpoint);
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);

export const fetchSimilarMovies = cache(
  async (id: number | string): Promise<MoviesNowPlayingType> => {
    const cacheKey = `tmdb-movies-similar-${id}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData) as MoviesNowPlayingType;

    const endpoint = `/movie/${id}/similar?language=en-US&page=1`;
    const data = await fetchWithErrorHandling<MoviesNowPlayingType>(endpoint);
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);

export const fetchNowPlayingMovies = cache(
  async (): Promise<MoviesNowPlayingType> => {
    const cacheKey = "tmdb-movies-now-playing";
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData) as MoviesNowPlayingType;

    const endpoint = `/movie/now_playing?language=en-US&page=1`;
    const data = await fetchWithErrorHandling<MoviesNowPlayingType>(endpoint);
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);

export const fetchUpcomingMovies = cache(
  async (): Promise<MoviesNowPlayingType> => {
    const cacheKey = "tmdb-movies-upcoming";
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData) as MoviesNowPlayingType;

    const endpoint = `/movie/upcoming?language=en-US&page=1`;
    const data = await fetchWithErrorHandling<MoviesNowPlayingType>(endpoint);
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);

export const fetchSearchingMovies = cache(
  async ({
    query,
    page,
    year,
    includeAdult,
  }: {
    query: string;
    page?: number | string;
    year?: number | string;
    includeAdult?: boolean;
  }): Promise<MoviesNowPlayingType> => {
    const cacheKey = `tmdb-movies-search-${query}-${page}-${year}-${includeAdult}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData) as MoviesNowPlayingType;

    const url = new URL(`${BASE_URL}/search/movie`);
    url.searchParams.set("query", query);
    url.searchParams.set("api_key", API_KEY);
    if (page) url.searchParams.set("page", String(page));
    if (year) url.searchParams.set("year", String(year));
    if (includeAdult)
      url.searchParams.set("include_adult", String(includeAdult));

    const data = await fetchWithErrorHandling<MoviesNowPlayingType>(
      url.toString().replace(BASE_URL, "")
    );
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);

export const fetchTrendingMovies = cache(
  async (): Promise<MoviesNowPlayingType> => {
    const cacheKey = "tmdb-movies-trending";
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData) as MoviesNowPlayingType;

    const endpoint = `/trending/movie/week?language=en-US&page=1`;
    const data = await fetchWithErrorHandling<MoviesNowPlayingType>(endpoint);
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);

export const fetchRecommendedMovies = cache(
  async (id: number | string): Promise<MoviesNowPlayingType> => {
    const cacheKey = `tmdb-movies-recommendations-${id}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData) as MoviesNowPlayingType;

    const endpoint = `/movie/${id}/recommendations?language=en-US&page=1`;
    const data = await fetchWithErrorHandling<MoviesNowPlayingType>(endpoint);
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);

export const fetchPersonInfo = cache(
  async (id: number | string): Promise<Person> => {
    const cacheKey = `tmdb-person-${id}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData) as Person;

    const endpoint = `/person/${id}?append_to_response=combined_credits,images`;
    const data = await fetchWithErrorHandling<Person>(endpoint);
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);

export const fetchMovieByGenreId = cache(
  async (
    genreId: number | string,
    sortBy:
      | "original_title.asc"
      | "original_title.desc"
      | "popularity.asc"
      | "popularity.desc"
      | "revenue.asc"
      | "revenue.desc"
      | "primary_release_date.asc"
      | "primary_release_date.desc"
      | "title.asc"
      | "title.desc"
      | "vote_average.asc"
      | "vote_average.desc"
      | "vote_count.asc"
      | "vote_count.desc",
    page: number | string
  ) => {
    const cacheKey = `tmdb-genre-${genreId}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData)
      return JSON.parse(cachedData) as MoviesNowPlayingWithoutDates;

    const endpoint = `/discover/movie?&with_genres=${genreId}&sort_by=${sortBy}&page=${page}&language=en-US`;
    const data = await fetchWithErrorHandling<MoviesNowPlayingWithoutDates>(
      endpoint
    );
    await redis.set(cacheKey, JSON.stringify(data), "EX", 86400);

    return data;
  }
);
