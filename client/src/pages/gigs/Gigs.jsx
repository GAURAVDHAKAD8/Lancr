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
    <div className="w-full flex justify-center py-[50px] bg-gray-900 text-gray-200">
      <div className="w-[1100px] py-[150px] flex flex-col gap-[15px]">
        <span className="font-[300] uppercase text-[13px] text-gray-400">
          Lancr "" Graphics & Design ""
        </span>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          AI Artists
        </h1>
        <p className="text-gray-400 font-[300]">
          Explore the boundaries of art and technology with Lancr's AI artists
        </p>
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-[10px] text-gray-400 font-[300]">
            <span>Budget</span>
            <input
              ref={minRef}
              type="number"
              placeholder="min"
              className="p-[5px] border border-gray-700 bg-gray-800 rounded-[5px] outline-none placeholder:text-gray-500 w-20"
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="max"
              className="p-[5px] border border-gray-700 bg-gray-800 rounded-[5px] outline-none placeholder:text-gray-500 w-20"
            />
            <button
              onClick={apply}
              className="p-[5px_10px] bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none font-[500] rounded-[5px] cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Apply
            </button>
          </div>
          <div className="relative flex items-center gap-[10px]">
            <span className="text-gray-400 font-[300]">Sort by</span>
            <span className="font-[500] text-gray-300">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./img/down.png"
              alt=""
              className="w-[15px] cursor-pointer filter invert"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="p-[20px] bg-gray-800 border border-gray-700 rounded-[5px] absolute top-[30px] right-0 z-[9] flex flex-col gap-[20px] text-gray-300 shadow-lg">
                {sort === "sales" ? (
                  <span
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                    onClick={() => reSort("createdAt")}
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    className="cursor-pointer hover:text-purple-400 transition-colors"
                    onClick={() => reSort("sales")}
                  >
                    Best Selling
                  </span>
                )}
                <span
                  className="cursor-pointer hover:text-purple-400 transition-colors"
                  onClick={() => reSort("sales")}
                >
                  Popular
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
