import { z } from "zod";
export const postSchema = z.object({
  tmdbID: z.number(),
  title: z.string(),
  poster: z.string(),
  rating: z.number(),
});
