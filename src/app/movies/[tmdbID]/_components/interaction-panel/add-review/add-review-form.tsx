"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, StarHalfIcon, StarIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { reviewSchema } from "./defintions";
import { Button } from "@/components/ui/button";
import { InferInsertModel } from "drizzle-orm";
import { reviewTable } from "@/db/schema/movie";
import { useReviews } from "@/store/useReviews";
type ReviewType = InferInsertModel<typeof reviewTable>;
// import { Rating } from "@smastrom/react-rating";

export default function AddReviewForm({
  movieID,
  close,
}: {
  movieID: number;
  close: () => void;
}) {
  const [hoverRating, setHoverRating] = useState(0);
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    getValues,
  } = useForm<ReviewType>({
    defaultValues: {
      tmdbID: movieID,
    },
    resolver: zodResolver(reviewSchema),
  });
  const { mutationAdd } = useReviews(movieID);
  const { rating } = getValues();

  const handleMouseEnter = (value: number) => setHoverRating(value);
  const handleMouseLeave = () => setHoverRating(0);
  const handleClick = async (value: number) => {
    setValue("rating", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const getStar = useCallback(
    (value: number) => {
      if (hoverRating >= value) {
        return (
          <StarIcon className="fill-green-500 stroke-1 stroke-green-500" />
        );
      } else if (rating >= value) {
        return (
          <StarIcon className="fill-green-500 stroke-1 stroke-green-500" />
        );
      } else if (rating >= value - 0.5) {
        return (
          <StarHalfIcon className="fill-green-500 stroke-1 stroke-green-500" />
        );
      } else {
        return <StarIcon className="stroke-1 stroke-white" />;
      }
    },
    [hoverRating, rating]
  );
  const onSubmit = async (data: ReviewType) => {
    await mutationAdd.mutateAsync(data);
    close();
  };
  return (
    <div className="max-h-full  h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => handleClick(value)}
                onMouseEnter={() => handleMouseEnter(value)}
                onMouseLeave={handleMouseLeave}
                className="transition-all"
              >
                {getStar(value)}
              </button>
            ))}
          </div>

          {errors.rating && (
            <p className="text-red-500">{errors.rating.message}</p>
          )}
        </div>
        <div className="">
          <textarea
            placeholder="Write a review"
            className=" rounded-md p-3 h-40 size-full bg-transparent outline-none border"
            {...register("comment")}
          />
          {errors.comment && (
            <p className="text-red-500 ">{errors.comment.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="self-end">
          {isSubmitting ? (
            <div className="flex items-center gap-1">
              <p>Submitting...</p>
              <Loader className="animate-spin duration-1000" />
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
