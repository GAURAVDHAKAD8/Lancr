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
    <Link to={`/gig/${item._id}`} className="no-underline mx-1 mb-10 ">
      <div className="w-[244px] h-[370px] border-[#333] m-[10px] border  rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Cover Image */}
        <img
          src={item.cover}
          alt="Gig cover"
          className="w-full h-[200px] object-cover"
        />

        {/* Info Section */}
        <div className="p-[4px]  flex flex-col gap-4 ">
          {/* User Info */}
          {isLoading ? (
            <div className="animate-pulse">Loading...</div>
          ) : error ? (
            <div className="text-red-500">Error loading user</div>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={data.img || "/img/check.png"}
                alt="User avatar"
                className="w-[30px] h-[30px]  rounded-full object-cover"
              />
              <span className="font-medium p-[5px] text-[#333] text-[13px] ">
                {data.username}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-800 m-[8px] line-clamp-2 text-[14px] text-[#333]">
            {item.desc}
          </p>

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
                  }`}
                />
              ))}
            </div>
            <span className="text-[12px] font-bold text-yellow-500 p-[5px] text-[#333]">
              {averageRating > 0 ? averageRating : "No ratings"}
            </span>
          </div>
        </div>

        <hr className="border-t border-[#333]" />

        {/* Price Section */}
        <div className="p-4 m-[10px] flex items-center justify-between ">
          <button className="p-1 hover:bg-gray-100 border-none rounded-full">
            <img
              src="./img/heart.png"
              alt="Favorite"
              className="w-[25px] h-[25px] "
            />
          </button>
          <div className="text-right">
            <span className="text-[15px] text-gray-500 text-[#333]">
              STARTING AT
            </span>
            <h2 className="text-[19px] font-normal text-gray-700 text-[#333]">
              $ {item.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
