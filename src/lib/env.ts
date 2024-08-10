import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {},
  server: {
    TMDB_ACCESS_TOKEN_AUTH: z.string(),
    TMDB_API_URI: z.string().url(),
    TMDB_API_KEY: z.string(),
  },
  runtimeEnv: {
    TMDB_ACCESS_TOKEN_AUTH: process.env.TMDB_ACCESS_TOKEN_AUTH,
    TMDB_API_URI: process.env.TMDB_API_URI,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
});
