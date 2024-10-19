import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number({
      required_error: "Please select a rating",
    })
    .min(0)
    .max(5),
  comment: z.string().optional(),
  tmdbID: z.number(),
});
