import Redis from "ioredis";
import { env } from "@/lib/env";

export const redis = new Redis({
  host: env.UPSTASH_REDIS_REST_HOST,
  port: Number(env.UPSTASH_REDIS_REST_PORT),
  password: env.UPSTASH_REDIS_REST_PASSWORD,
});
