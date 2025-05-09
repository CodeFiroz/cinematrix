import React, { useState } from "react";

export default function StarRating({ totalStars = 5 }) {
  const [rating, setRating] = useState(0); // selected rating
  const [hover, setHover] = useState(0); // hovered star

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className={`text-xl transition-colors ${
              starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <i className="bx bxs-star"></i>
          </button>
        );
      })}
      <span className="ml-2 text-gray-400">{rating > 0 ? `${rating}/${totalStars}` : ""}</span>
    </div>
  );
}
