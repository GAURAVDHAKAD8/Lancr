import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigUser", item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  const averageRating =
    item.starNumber > 0 ? Math.round(item.totalStars / item.starNumber) : 0;

  return (
    <Link to={`/gig/${item._id}`} className="no-underline mx-1 mb-10">
      <div className="w-[244px] h-[390px] border border-gray-700 m-[10px] rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-100/20 transition-all duration-300 bg-gray-800">
        {/* Cover Image */}
        <img
          src={item.cover}
          alt="Gig cover"
          className="w-full h-[200px] object-cover"
        />

        {/* Info Section */}
        <div className="p-[10px] flex flex-col gap-3">
          {/* User Info */}
          {isLoading ? (
            <div className="animate-pulse text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-red-400">Error loading user</div>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={data.img || "/img/check.png"}
                alt="User avatar"
                className="w-[30px] h-[30px] rounded-full object-cover border border-gray-600"
              />
              <span className="font-medium text-gray-300 text-[13px]">
                {data.username}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-400 line-clamp-2 text-[14px]">{item.desc}</p>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src="./img/star.png"
                  alt="Star"
                  className={`w-[15px] h-[15px] ${
                    i < averageRating ? "opacity-100" : "opacity-30"
                  } filter brightness-0 invert`}
                />
              ))}
            </div>
            <span className="text-[12px] font-bold text-yellow-400">
              {averageRating > 0 ? averageRating : "No ratings"}
            </span>
          </div>
        </div>

        <hr className="border-t border-gray-700" />

        {/* Price Section */}
        <div className="p-3 flex items-center justify-between">
          <button className="p-1 hover:bg-gray-700 border-none rounded-full transition-colors duration-200">
            <img
              src="./img/heart.png"
              alt="Favorite"
              className="w-[20px] h-[20px] filter brightness-0 invert opacity-80 hover:opacity-100"
            />
          </button>
          <div className="text-right">
            <span className="text-[12px] text-gray-400 uppercase">
              STARTING AT
            </span>
            <h2 className="text-[18px] font-medium text-white">
              $ {item.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
