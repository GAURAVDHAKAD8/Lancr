import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-purple-900/50 text-white">
      <div className="max-w-[1450px] mx-auto px-6 py-[190px]">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Discover Top
              <span className="font-light italic"> freelance</span> Services for
              Your Business Needs
            </h1>

            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="flex items-center gap-3 flex-1 px-4">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder='Try "building mobile app"'
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full py-3 outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-300">Popular:</span>
              {[
                "Web Design",
                "Graphic Design",
                "Video Editing",
                "AI Services",
                
              ].map((tag) => (
                <button
                  key={tag}
                  className="text-white border border-gray-300 px-4 py-1 rounded-full bg-transparent text-sm hover:bg-white/10 transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="./img/intro.gif"
              alt="Freelancer"
              className="max-w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
