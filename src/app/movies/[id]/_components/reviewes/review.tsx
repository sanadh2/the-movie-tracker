"use client";
import { Button } from "@/components/ui/button";
import { removeHtmlTags } from "@/lib/removeHtmlTags";
import { useAuth } from "@clerk/nextjs";
import { Review as ReviewProp } from "@prisma/client";
import { ChevronDown, ChevronRight, DeleteIcon } from "lucide-react";
import { useState } from "react";
import { useDeleteReview } from "./reviews-data.hooks";
import StarRating from "./star-rating";

export default function Review({ review }: { review: ReviewProp }) {
  const [showMore, setShowMore] = useState(false);
  const { userId } = useAuth();
  const { mutate } = useDeleteReview(review.tmdbID);
  return (
    <div className="border-t p-5 font-serif">
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center">
          <button onClick={() => setShowMore(!showMore)} className="">
            {showMore ? <ChevronDown /> : <ChevronRight />}
          </button>
          <h6 className="capitalize font-semibold">
            {removeHtmlTags(review.name ? review.name : undefined)}
          </h6>
          <StarRating rating={review.rating} />
        </div>
        {userId === review.userID && (
          <Button
            onClick={() => mutate(review.id)}
            title="delete review"
            size={"icon"}
          >
            <DeleteIcon />
          </Button>
        )}
      </div>
      <div className="">
        <pre
          className={`font-serif indent-10 max-w-full whitespace-pre-wrap overflow-auto transition-all ${
            showMore
              ? "max-h-max animate-accordion-down"
              : "max-h-0 animate-accordion-up"
          }`}
        >
          {removeHtmlTags(review.comment ? review.comment : undefined)}
        </pre>
      </div>
    </div>
  );
}
