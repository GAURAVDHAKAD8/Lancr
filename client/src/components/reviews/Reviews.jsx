import React from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId, totalStars, starNumber }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
  }
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "something went wrong"
        : data.map((review) => (
            <Review
              key={review._id}
              review={review}
              totalStars={totalStars}
              starNumber={starNumber}
            />
          ))}
      <div className="add">
        <h3> Add a new Form</h3>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="write your opinion"/>
            <select name=" " id="">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>

            </select>
            <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
