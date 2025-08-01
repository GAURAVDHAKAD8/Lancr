import React from "react";
import { Link } from "react-router-dom";

function CatCard({ card }) {
  return (
    <Link to="/gigs?cat=design" className="no-underline block">
      {" "}
      {/* Added block display */}
      <div className="w-full max-w-[250px] h-[344px] text-[#ffffff] rounded-[5px] relative cursor-pointer overflow-hidden mx-auto">
        {" "}
        {/* Made width responsive */}
        <img
          src={card.img}
          alt={card.title}
          className="w-[200px] h-[100%] object-cover"
        />
        <span className="font-[300] absolute top-[15px] left-[15px]">
          {card.desc}
        </span>
        <span className="absolute top-[40px] left-[15px] text-[24px] font-[500]">
          {card.title}
        </span>
      </div>
    </Link>
  );
}

export default CatCard;
