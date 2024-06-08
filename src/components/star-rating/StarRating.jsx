import { Rating } from 'react-simple-star-rating';
import propTypes from "prop-types";

export default function StarRating({ rating }) {
    return (
        <Rating
        readonly={true}
        allowFraction={true}
        initialValue={rating}
        size={20}
      />
    )
}

StarRating.propTypes = {
  rating: propTypes.number,
}