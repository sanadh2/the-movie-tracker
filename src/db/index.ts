import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(env.DATABASE_URL, {
  prepare: false,
  ssl: "require",
});
export const db = drizzle(client);
