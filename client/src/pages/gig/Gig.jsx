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
    <div className="flex justify-center">
      {isLoading ? (
        "loading"
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="w-[1400px] py-[30px] flex gap-[50px]">
          <div className="flex-[2] flex flex-col gap-[20px]">
            <span className="font-[300] uppercase text-[13px] text-[#555]">
              Lancr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "Loading"
            ) : errorUser ? (
              "something went wrong"
            ) : dataUser ? (
              <div className="flex items-center gap-[10px]">
                <img
                  className="w-[32px] h-[32px] rounded-[50%] object-cover"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span className="text-[14px] font-[500]">
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
              "User not found"
            )}
            {data.images && data.images.length > 0 ? (
              <Slider
                slidesToShow={1}
                arrowsScroll={1}
                className="bg-[#F5F5F5]"
              >
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
              <div>No images available</div>
            )}
            <h2 className="font-[400]">About This Gig</h2>
            <p className="font-[300] leading-[25px] text-[#555]">{data.desc}</p>
            {isLoadingUser ? (
              "Loading"
            ) : errorUser ? (
              "something went wrong"
            ) : dataUser ? (
              <div className="mt-[50px] flex flex-col gap-[20px]">
                <h2>About The Seller</h2>
                <div className="flex items-center gap-[20px]">
                  <img
                    src={dataUser.img || "/img/noavatar.jpg"}
                    alt=""
                    className="w-[100px] h-[100px] rounded-[50%] object-cover"
                  />
                  <div className="flex flex-col gap-[10px]">
                    <span>{dataUser.username}</span>
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
                    <button className="bg-white rounded-[5px] border border-gray-400 p-[10px]">
                      Contact Me
                    </button>
                  </div>
                </div>
                <div className="border border-[lightgray] rounded-[5px] p-[20px] mt-[20px]">
                  <div className="flex justify-between flex-wrap">
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300]">From</span>
                      <span>{dataUser.country}</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300]">Member since</span>
                      <span>Aug 2022</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300]">Avg. response time</span>
                      <span>4 hours</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300]">Last delivery</span>
                      <span>1 day</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-[300]">Languages</span>
                      <span>English</span>
                    </div>
                  </div>
                  <hr className="h-0 border-[0.5px] border-[lightgray] my-[20px]" />
                  <p>{dataUser.desc || "No description available"}</p>
                </div>
              </div>
            ) : null}
            <Reviews
              gigId={id}
              totalStars={data.totalStars}
              starNumber={data.starNumber}
            />
          </div>
          <div className="flex-1 border border-[lightgray] rounded-[5px] p-[20px] flex flex-col gap-[20px] h-max max-h-[500px] sticky top-[150px]">
            <div className="flex items-center justify-between">
              <h3 className="font-[500]">{data.shortTitle}</h3>
              <h2 className="font-[300]">${data.price}</h2>
            </div>
            <p className="text-gray-500 my-[10px]">{data.shortDesc}</p>
            <div className="flex items-center justify-between text-[14px]">
              <div className="flex items-center gap-[10px]">
                <img src="/img/clock.png" alt="" className="w-[20px]" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="flex items-center gap-[10px]">
                <img src="/img/recycle.png" alt="" className="w-[20px]" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div
                  className="flex items-center gap-[10px] font-[300] text-gray-500 mb-[5px]"
                  key={feature}
                >
                  <img src="/img/greencheck.png" alt="" className="w-[14px]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button className="bg-[#1dbf73] p-[10px] text-white font-[500] border-none text-[18px] cursor-pointer">
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
