type Nullable<T> = T | null;

export interface MovieType {
  adult: boolean;
  backdrop_path: Nullable<string>;
  belongs_to_collection: Nullable<BelongsToCollectionType>;
  budget: number;
  genres: GenreType[];
  homepage: Nullable<string>;
  id: number;
  imdb_id: Nullable<string>;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: Nullable<string>;
  production_companies: ProductionCompanyType[];
  production_countries: ProductionCountryType[];
  release_date: string;
  revenue: number;
  runtime: Nullable<number>;
  spoken_languages: SpokenLanguageType[];
  status: string;
  tagline: Nullable<string>;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: CreditsType;
  videos: VideosType;
  images: ImagesType;
}

export interface BelongsToCollectionType {
  id: number;
  name: string;
  poster_path: Nullable<string>;
  backdrop_path: Nullable<string>;
}

export interface CreditsType {
  cast: CastType[];
  crew: CastType[];
}

export interface CastType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: DepartmentType;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: Nullable<string>;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: DepartmentType;
  job?: string;
}

export type DepartmentType =
  | "Acting"
  | "Art"
  | "Camera"
  | "Costume & Make-Up"
  | "Crew"
  | "Directing"
  | "Editing"
  | "Lighting"
  | "Production"
  | "Sound"
  | "Visual Effects"
  | "Writing";

export interface GenreType {
  id: number;
  name: string;
}

export interface ImagesType {
  backdrops: MovieImageType[];
  logos: MovieImageType[];
  posters: MovieImageType[];
}

export interface MovieImageType {
  aspect_ratio: number;
  height: number;
  iso_639_1: Nullable<string>;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ProductionCompanyType {
  id: number;
  logo_path: Nullable<string>;
  name: string;
  origin_country: string;
}

export interface ProductionCountryType {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguageType {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface VideosType {
  results: VideoResultType[];
}

export interface VideoResultType {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: VideoType;
  official: boolean;
  id: string;
}

export type VideoType =
  | "Behind the Scenes"
  | "Clip"
  | "Featurette"
  | "Teaser"
  | "Trailer";

// Recommendations
export interface RecommendationsType {
  recommendations: RecommendationType[];
}

export interface RecommendationType {
  page: number;
  results: RecommendationResultType[];
  total_pages: number;
  total_results: number;
}

export interface RecommendationResultType {
  backdrop_path: Nullable<string>;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: Nullable<string>;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesNowPlayingType {
  dates: DatesType;
  results: MovieResultType[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface DatesType {
  maximum: string;
  minimum: string;
}

export interface MovieResultType {
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
}

export interface Person {
  adult: boolean;
  also_known_as: any[];
  biography: string;
  birthday: string;
  deathday: Nullable<string>;
  gender: number;
  homepage: Nullable<string>;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  images: DirectorImages;
  combined_credits: CombinedCredits;
}
export interface CombinedCredits {
  cast: Cast[];
  crew: Crew[];
}
export interface Cast {
  adult: boolean;
  backdrop_path: Nullable<string>;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: Nullable<string>;
  release_date?: Nullable<string>;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order?: number;
  media_type: string;
  origin_country?: string[];
  original_name?: string;
  first_air_date?: Nullable<string>;
  name?: string;
  episode_count?: number;
}
export interface Crew {
  adult: boolean;
  backdrop_path: Nullable<string>;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: Nullable<string>;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: DepartmentType;
  job: string;
  media_type: string;
}

export interface DirectorImages {
  profiles: DirectorImage[];
}

export interface DirectorImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
