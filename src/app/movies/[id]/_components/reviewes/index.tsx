import reviews from "./review-data.json";
import StarRating from "./star-rating";
export default function Reviews() {
  return (
    <div>
      <h3>Popular reviews</h3>
      <div className="">
        {reviews.map((review) => (
          <div key={review.id} className="border-t py-5">
            <div className="flex gap-3">
              <h4 className="font-light">
                Review by{" "}
                <span className="font-semibold">{review.reviewerName}</span>
              </h4>
              <StarRating rating={review.rating} />
            </div>
            <p className="indent-3 font-medium mt-4 font-serif">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
