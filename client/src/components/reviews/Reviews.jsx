import React from "react";
import Review from "../review/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId, totalStars, starNumber }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
    e.target.reset();
  };

  return (
    <div className="flex flex-col gap-[20px] my-[20px]">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong."
        : data.map((review) => (
            <Review
              key={review._id}
              review={review}
              totalStars={totalStars}
              starNumber={starNumber}
            />
          ))}

      <div className="flex flex-col gap-[20px] mt-[20px]">
        <h3>Add a new Review</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
          <input
            type="text"
            placeholder="Write your opinion"
            required
            className="p-[20px]"
          />
          <select required className="w-[200px] p-[20px] self-end">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button
            type="submit"
            className="self-end w-[100px] border-none p-[10px] text-white bg-[#1dbf73] cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
