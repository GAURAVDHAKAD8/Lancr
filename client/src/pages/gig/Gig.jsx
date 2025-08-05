import React from "react";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="flex justify-center bg-gray-900">
      {isLoading ? (
        <div className="text-gray-300">loading</div>
      ) : error ? (
        <div className="text-red-400">something went wrong</div>
      ) : (
        <div className="w-[1400px] py-[220px] flex gap-[50px]">
          <div className="flex-[2] flex flex-col gap-[20px]">
            <span className="font-[300] uppercase text-[13px] text-gray-400">
              Lancr {">"} Graphics & Design {">"}
            </span>
            <h1 className="text-white">{data.title}</h1>
            {isLoadingUser ? (
              <div className="text-gray-300">Loading</div>
            ) : errorUser ? (
              <div className="text-red-400">something went wrong</div>
            ) : dataUser ? (
              <div className="flex items-center gap-[10px]">
                <img
                  className="w-[32px] h-[32px] rounded-[50%] object-cover"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span className="text-[14px] font-[500] text-gray-300">
                  {dataUser.username}
                </span>
                {data.starNumber > 0 && (
                  <div className="flex items-center gap-[5px]">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, index) => (
                        <img
                          key={index}
                          src="/img/star.png"
                          alt=""
                          className="h-[14px] w-[14px]"
                        />
                      ))}
                    <span className="text-[14px] font-bold text-[#ffc108]">
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-300">User not found</div>
            )}
            {data.images && data.images.length > 0 ? (
              <Slider slidesToShow={1} arrowsScroll={1} className="bg-gray-800">
                {data.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gig Image ${index + 1}`}
                    className="max-h-[500px] object-contain"
                  />
                ))}
              </Slider>
            ) : (
              <div className="text-gray-400">No images available</div>
            )}
            <h2 className="font-[400] text-white">About This Gig</h2>
            <p className="font-[300] leading-[25px] text-gray-400">
              {data.desc}
            </p>
            {isLoadingUser ? (
              <div className="text-gray-300">Loading</div>
            ) : errorUser ? (
              <div className="text-red-400">something went wrong</div>
            ) : dataUser ? (
              <div className="mt-[50px] flex flex-col gap-[20px]">
                <h2 className="text-white">About The Seller</h2>
                <div className="flex items-center gap-[20px]">
                  <img
                    src={dataUser.img || "/img/noavatar.jpg"}
                    alt=""
                    className="w-[100px] h-[100px] rounded-[50%] object-cover"
                  />
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-gray-300">{dataUser.username}</span>
                    {data.starNumber > 0 && (
                      <div className="flex items-center gap-[5px]">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, index) => (
                            <img
                              key={index}
                              src="/img/star.png"
                              alt=""
                              className="h-[14px] w-[14px]"
                            />
                          ))}
                        <span className="text-[14px] font-bold text-[#ffc108]">
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button className="bg-gray-700 text-gray-300 rounded-[5px] border border-gray-600 p-[10px] hover:bg-gray-600">
                      Contact Me
                    </button>
                  </div>
                </div>
                <div className="border border-gray-700 rounded-[5px] p-[20px] mt-[20px] bg-gray-800">
                  <div className="flex justify-between flex-wrap">
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300] text-gray-400">From</span>
                      <span className="text-gray-300">{dataUser.country}</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300] text-gray-400">
                        Member since
                      </span>
                      <span className="text-gray-300">Aug 2022</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300] text-gray-400">
                        Avg. response time
                      </span>
                      <span className="text-gray-300">4 hours</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300] text-gray-400">
                        Last delivery
                      </span>
                      <span className="text-gray-300">1 day</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300] text-gray-400">
                        Languages
                      </span>
                      <span className="text-gray-300">English</span>
                    </div>
                  </div>
                  <hr className="h-0 border-[0.5px] border-gray-700 my-[20px]" />
                  <p className="text-gray-400">
                    {dataUser.desc || "No description available"}
                  </p>
                </div>
              </div>
            ) : null}
            <Reviews
              gigId={id}
              totalStars={data.totalStars}
              starNumber={data.starNumber}
            />
          </div>
          <div className="flex-1 border border-gray-700 rounded-[5px] p-[20px] flex flex-col gap-[20px] h-max max-h-[500px] sticky top-[150px] bg-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="font-[500] text-white">{data.shortTitle}</h3>
              <h2 className="font-[300] text-white">${data.price}</h2>
            </div>
            <p className="text-gray-400 my-[10px]">{data.shortDesc}</p>
            <div className="flex items-center justify-between text-[14px]">
              <div className="flex items-center gap-[10px] text-gray-300">
                <img src="/img/clock.png" alt="" className="w-[20px]" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="flex items-center gap-[10px] text-gray-300">
                <img src="/img/recycle.png" alt="" className="w-[20px]" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div
                  className="flex items-center gap-[10px] font-[300] text-gray-400 mb-[5px]"
                  key={feature}
                >
                  <img src="/img/greencheck.png" alt="" className="w-[14px]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button className="bg-[#1dbf73] p-[10px] text-white font-[500] border-none text-[18px] cursor-pointer hover:bg-[#19a463]">
                Continue
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
