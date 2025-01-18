import React from "react";
import styles from "./styles.module.css";

// Define the StarRating component
type StarRatingProps = {
  rate: number;
  count: number;
};
const StarRating: React.FC<StarRatingProps> = ({ rate, count }) => {
  const filledStars = Math.floor(rate); // Integer part of the rate
  const halfStar = rate % 1 !== 0; // Check if there's a half-star
  const emptyStars = 5 - Math.ceil(rate); // Remaining empty stars

  // Array representing the stars
  const stars = [
    ...Array(filledStars).fill("filled"), // Filled stars
    ...(halfStar ? ["half"] : []), // Half-star if applicable
    ...Array(emptyStars).fill("empty"), // Empty stars
  ];

  return (
    <div className={styles.starRating}>
      {stars.map((star, index) => (
        <span key={index} className={`${styles.star} ${styles[star]}`}>
          &#9733; {/* Unicode star character */}
        </span>
      ))}
      <span className={styles.ratingCount}>({count} ratings)</span>
    </div>
  );
};

export default StarRating;
