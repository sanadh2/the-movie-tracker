import { z } from "zod";

export const postSchema = z.object({
  tmdbID: z.number(),
  rating: z.number(),
  comment: z.string().optional(),
});

export const updateSchema = z.object({
  rating: z.number(),
  comment: z.string().optional(),
});
