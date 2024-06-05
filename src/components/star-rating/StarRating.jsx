import ReactStars from "react-rating-stars-component";
export default function StarRating({ rating }) {
    return (
        <ReactStars
        value={rating}

      />
    )
}

ReactStars.defaultProps = {
    count={5}
    size: 24,
    color: '#f00',
    edit={false}
    isHalf={true}
  };