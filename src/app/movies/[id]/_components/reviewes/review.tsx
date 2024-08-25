"use client";
import { removeHtmlTags } from "@/lib/removeHtmlTags";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Review as ReviewProp } from "moviedb-promise";
import { useState } from "react";

export default function Review({ review }: { review: ReviewProp }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="border-t p-5 font-serif">
      <div className="flex gap-3 items-center">
        <button onClick={() => setShowMore(!showMore)} className="">
          {showMore ? <ChevronDown /> : <ChevronRight />}
        </button>
        <h6 className="capitalize font-semibold">
          {removeHtmlTags(review.author)}
        </h6>
      </div>
      <div className="">
        <pre
          className={`font-serif max-w-full whitespace-pre-wrap overflow-auto transition-all ${
            showMore
              ? "max-h-max animate-accordion-down"
              : "max-h-0 animate-accordion-up"
          }`}
        >
          {removeHtmlTags(review.content)}
        </pre>
      </div>
    </div>
  );
}
