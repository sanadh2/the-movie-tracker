"use client";
import { Button } from "@/components/ui/button";
import { removeHtmlTags } from "@/lib/removeHtmlTags";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDeleteReview } from "./reviews-data.hooks";
import StarRating from "./star-rating";
import { useSession } from "next-auth/react";
import { reviewTable } from "@/db/schema/movie";
import { InferSelectModel } from "drizzle-orm";

type ReviewType = InferSelectModel<typeof reviewTable>;
type Prop = {
  review: ReviewType;
};

export default function Review({ review }: Prop) {
  const [showMore, setShowMore] = useState(true);
  const { data: session } = useSession();
  const { mutate } = useDeleteReview(review.tmdbID);

  return (
    <div className="border-t p-5 font-serif border rounded-lg">
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-3 items-center h-10">
          <h6 className="capitalize font-semibold">
            {removeHtmlTags(review.reviewer)}
          </h6>
          <StarRating rating={review.rating || 0} />
        </div>
        {session?.user?.id === review.userID && (
          <Button
            onClick={() => mutate(review.id)}
            title="delete review"
            size={"icon"}
            variant={"ghost"}
          >
            <TrashIcon className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </div>
      <div className="">
        <pre
          className={`font-serif  whitespace-pre-wrap transition-all ${
            showMore ? "line-clamp-6" : "line-clamp-none"
          }`}
        >
          <p>{removeHtmlTags(review.comment ? review.comment : undefined)}</p>
        </pre>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-sm font-semibold"
        >
          {showMore ? "Show more" : "Show less"}
        </button>
      </div>
    </div>
  );
}
