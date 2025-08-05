import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Review = ({ review, totalStars, starNumber }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  const avgRating = Math.round(totalStars / (starNumber || 1));

  return (
    <div className="review bg-gray-800 p-6 rounded-lg text-gray-300">
      {isLoading || error ? (
        <div className="text-gray-400">Loading user...</div>
      ) : (
        <div className="user flex items-center gap-4 mb-4">
          <img
            className="pp w-12 h-12 rounded-full object-cover"
            src={data.img || "/img/noavatar.jpg"}
            alt=""
          />
          <div className="info">
            <span className="font-medium text-white">{data.username}</span>
            <div className="country">
              <span className="text-gray-400 text-sm">{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars flex items-center gap-1 mb-4">
        {Array(review.star)
          .fill()
          .map((_, index) => (
            <img key={index} src="/img/star.png" alt="" className="w-4 h-4" />
          ))}
        <span className="ml-1 text-yellow-400">{review.star}</span>
      </div>
      <p className="mb-4 text-gray-300">{review.desc}</p>
      <div className="helpful flex items-center gap-3 text-sm text-gray-400">
        <span>Helpful?</span>
        <img
          src="/img/like.png"
          alt=""
          className="w-4 h-4 cursor-pointer hover:opacity-80"
        />
        <span>Yes</span>
        <img
          src="/img/dislike.png"
          alt=""
          className="w-4 h-4 cursor-pointer hover:opacity-80 "
        />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
