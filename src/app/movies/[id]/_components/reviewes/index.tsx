"use client";
import Review from "./review";
import { useReviewsData } from "./reviews-data.hooks";
export default function Reviews({ id }: { id: string | number }) {
  const { data, isLoading, isError, error } = useReviewsData(Number(id));
  return (
    <div>
      <h3>Popular reviews</h3>
      <div className="">
        {isError ? (
          <p className="text-red-500 text-center">{error.message}</p>
        ) : isLoading ? (
          <>Loading...</>
        ) : !data ? (
          <p className="text-center">No reviews yet</p>
        ) : data.length <= 0 ? (
          <p className="text-center">No reviews yet</p>
        ) : (
          data.map((review) => <Review review={review} key={review.id} />)
        )}
      </div>
    </div>
  );
}
