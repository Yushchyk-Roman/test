import { useState, useEffect } from "react";
import "./StarRating.css";

const StarRating = ({ cookingTime, onRatingChange, currentRating = 0 }) => {
  const [rating, setRating] = useState(currentRating);
  const [hover, setHover] = useState(0);

  const handleRatingClick = (star) => {
    setRating(star);
  };

  useEffect(() => {
    if (rating > 0 && onRatingChange) {
      onRatingChange(rating);
    }
  }, [rating, onRatingChange]);

  return (
    <ul className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <li key={star}>
          <button
            aria-label={`Rate ${star} star`}
            onClick={() => handleRatingClick(star)} 
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <i
              className={`fa-solid fa-star ${
                star <= (hover || rating) ? "active" : ""
              }`}
            ></i>
          </button>
        </li>
      ))}
      <li className="time-of-cooking">{cookingTime} min</li>
    </ul>
  );
};

export default StarRating;