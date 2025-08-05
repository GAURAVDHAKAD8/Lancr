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
      <h2 className="text-white text-2xl font-semibold">Reviews</h2>
      {isLoading ? (
        <span className="text-gray-400">Loading...</span>
      ) : error ? (
        <span className="text-red-400">Something went wrong.</span>
      ) : (
        data.map((review) => (
          <Review
            key={review._id}
            review={review}
            totalStars={totalStars}
            starNumber={starNumber}
          />
        ))
      )}

      <div className="flex flex-col gap-[20px] mt-[20px]">
        <h3 className="text-white text-xl font-medium">Add a new Review</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
          <input
            type="text"
            placeholder="Write your opinion"
            required
            className="p-[20px] bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <select
            required
            className="w-[200px] p-[20px] self-end bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button
            type="submit"
            className="self-end w-[100px] border-none p-[10px] text-white bg-[#1dbf73] cursor-pointer rounded hover:bg-[#19a463] transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
