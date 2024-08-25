import React from "react";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(<StarIcon className="fill-green-500" strokeWidth={0} />)
        .map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      {halfStar ? <span className=" text-green-500 ">½</span> : null}
    </div>
  );
};

export default StarRating;
