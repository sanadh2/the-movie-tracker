"use client";
import { Button } from "@/components/ui/button";
import { removeHtmlTags } from "@/lib/removeHtmlTags";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import StarRating from "./star-rating";
import { useSession } from "next-auth/react";
import { reviewTable } from "@/db/schema/movie";
import { InferSelectModel } from "drizzle-orm";
import { useReviews } from "@/store/useReviews";

type ReviewType = InferSelectModel<typeof reviewTable>;
type Prop = {
  review: ReviewType;
};

export default function Review({ review }: Prop) {
  const [showMore, setShowMore] = useState(true);
  const { data: session } = useSession();
  const { mutationRemove } = useReviews(Number(review.tmdbID));

  return (
    <div className="border-t p-5 border rounded-lg bg-muted w-full">
      <div className="flex gap-3 items-center justify-between ">
        <div className="flex gap-3 items-center h-10">
          <div className="">
            <h6 className="capitalize font-mono text-xl">
              {removeHtmlTags(review.reviewer)}
            </h6>
            <sub></sub>
          </div>
          <StarRating rating={review.rating || 0} />
        </div>
        {session?.user?.id === review.userID && (
          <Button
            onClick={() => mutationRemove.mutate(review.id)}
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
          className={`font-sans whitespace-pre-wrap transition-all ${
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
