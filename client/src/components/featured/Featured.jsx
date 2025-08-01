import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="w-full bg-[#013914] text-[#ffffff]">
      <div className="max-w-[1100px] mx-auto px-[20px] py-[100px]">
        {/* Flex row with centered items */}
        <div className="flex items-center gap-[50px]">
          {/* Text Content (Left) */}
          <div className="flex-1">
            <h1 className="text-[50px] leading-[1.2] mb-[30px]">
              Find the perfect{" "}
              <span className="italic font-[300]">freelance</span> services for
              your business
            </h1>

            {/* Search Bar */}
            <div className="bg-[#ffffff] rounded-[5px] flex items-center mb-[30px]">
              <div className="flex items-center gap-[10px] flex-1">
                <img
                  src="./img/search.png"
                  alt="Search"
                  className="w-[20px] h-[20px] ml-[15px]"
                />
                <input
                  type="text"
                  placeholder='Try "building mobile app"'
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-[10px] border-none outline-none placeholder:text-[#808080]"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-[120px] h-[50px] border-none bg-[#1dbf73] text-[#ffffff] cursor-pointer hover:bg-[#19a463]"
              >
                Search
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex items-center gap-[10px]">
              <span>Popular:</span>
              {["Web Design", "WordPress", "Logo Design", "AI Services"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="text-[#ffffff] border border-[#ffffff] px-[10px] py-[5px] rounded-[20px] bg-transparent text-[14px] hover:bg-[#ffffff20]"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Image (Right) */}
          <div className="flex-1 flex justify-center">
            <img
              src="./img/man.png"
              alt="Freelancer"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
