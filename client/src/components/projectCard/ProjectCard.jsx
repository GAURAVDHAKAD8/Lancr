import React from "react";

function ProjectCard({ card }) {
  return (
    <div className="w-64 rounded-xl overflow-hidden border border-gray-700 bg-gray-800 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 mx-3">
      <img src={card.img} alt="" className="w-full h-40 object-cover" />
      <div className="p-4 flex items-center gap-4">
        <img
          src={card.pp}
          alt=""
          className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
        />
        <div>
          <h2 className="text-gray-300 font-medium">{card.cat}</h2>
          <span className="text-gray-400 text-sm">{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
