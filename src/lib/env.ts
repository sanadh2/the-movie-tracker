import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  server: {
    TMDB_ACCESS_TOKEN_AUTH: z.string(),
    TMDB_API_URI: z.string().url(),
    TMDB_API_KEY: z.string(),
    UPSTASH_REDIS_REST_HOST: z.string(),
    UPSTASH_REDIS_REST_PORT: z.string().regex(/^\d+$/),
    UPSTASH_REDIS_REST_PASSWORD: z.string(),
    DATABASE_URL: z.string(),
    SMTP_PASSWORD: z.string(),
    SMTP_MAIL: z.string().email(),
    SMTP_PORT: z.string().regex(/^\d+$/),
    SMTP_HOST: z.string(),
  },
  runtimeEnv: {
    TMDB_ACCESS_TOKEN_AUTH: process.env.TMDB_ACCESS_TOKEN_AUTH,
    TMDB_API_URI: process.env.TMDB_API_URI,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    UPSTASH_REDIS_REST_HOST: process.env.UPSTASH_REDIS_REST_HOST,
    UPSTASH_REDIS_REST_PORT: process.env.UPSTASH_REDIS_REST_PORT,
    UPSTASH_REDIS_REST_PASSWORD: process.env.UPSTASH_REDIS_REST_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_MAIL: process.env.SMTP_MAIL,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_HOST: process.env.SMTP_HOST,
  },
});
