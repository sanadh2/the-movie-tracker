import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/user/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgres://postgres:password@localhost:5432/moovie",
  },
});
