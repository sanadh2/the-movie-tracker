"use client";
import { useReviews } from "@/store/useReviews";
import Review from "./review";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/components/loader/";

export default function Reviews({ id }: { id: string | number }) {
  const { reviews, isLoading, error } = useReviews(Number(id));
  return (
    <div className="w-[65%] border rounded-md p-5">
      <h3 className="font-mono text-xl text-center">Popular reviews</h3>
      <div className=" mt-10 gap-2 grid place-items-center">
        {error ? (
          <p className="text-red-500 text-center ">{error.message}</p>
        ) : isLoading ? (
          <Loader />
        ) : !reviews ? (
          <p className="text-center">No reviews yet</p>
        ) : reviews.length <= 0 ? (
          <p className="text-center">No reviews yet</p>
        ) : (
          reviews.map((review) => <Review review={review} key={review.id} />)
        )}
      </div>
    </div>
  );
}
