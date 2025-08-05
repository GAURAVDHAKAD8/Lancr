import React from "react";
import { Link } from "react-router-dom";

function CatCard({ card }) {
  return (
    <Link to="/gigs?cat=design" className="block no-underline group">
      <div className="relative w-full h-80 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20">
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
          <span className="text-gray-300 text-sm">{card.desc}</span>
          <span className="text-white text-xl font-bold mt-1">
            {card.title}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CatCard;
