import React, { useRef, useState, useEffect } from "react";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1100px] py-[150px] flex flex-col gap-[15px]">
        <span className="font-[300] uppercase text-[13px] text-[#555]">
          Lancr "" Graphics & Design ""
        </span>
        <h1>AI Artists</h1>
        <p className="text-[#999] font-[300]">
          Explore the boundaries of art and technology with Lancr's AI artists
        </p>
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-[10px] text-[#555] font-[300]">
            <span>Budget</span>
            <input
              ref={minRef}
              type="number"
              placeholder="min"
              className="p-[5px] border border-[lightgrey] rounded-[5px] outline-none placeholder:text-[#999]"
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="max"
              className="p-[5px] border border-[lightgrey] rounded-[5px] outline-none placeholder:text-[#999]"
            />
            <button
              onClick={apply}
              className="p-[5px_10px] bg-[#1dbf73] text-white border-none font-[500] rounded-[5px] cursor-pointer"
            >
              Apply
            </button>
          </div>
          <div className="relative flex items-center gap-[10px]">
            <span className="text-[#555] font-[300]">Sort by</span>
            <span className="font-[500]">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./img/down.png"
              alt=""
              className="w-[15px] cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="p-[20px] bg-white border-[0.5px] border-[lightgrey] rounded-[5px] absolute top-[30px] right-0 z-[9] flex flex-col gap-[20px] text-[#555]">
                {sort === "sales" ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => reSort("createdAt")}
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => reSort("sales")}
                  >
                    Best Selling
                  </span>
                )}
                <span
                  className="cursor-pointer"
                  onClick={() => reSort("sales")}
                >
                  Popular
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between flex-wrap">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
