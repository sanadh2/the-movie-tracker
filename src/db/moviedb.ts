import { MovieDb } from "moviedb-promise";
import { env } from "@/lib/env";
const moviedb = new MovieDb(env.TMDB_API_KEY);

export default moviedb;
