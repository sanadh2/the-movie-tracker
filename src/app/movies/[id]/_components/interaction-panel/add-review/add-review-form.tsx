"use client";
import { z } from "zod";
const schema = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string().min(10),
});
export default function AddReviewForm() {
  return <div></div>;
}
