import React from "react";

function ProjectCard({ card }) {
  return (
    <div className="w-[200px] h-[200px] rounded-[5px] overflow-hidden cursor-pointer border border-gray-200 ml-[30px]">
      <img src={card.img} alt="" className="w-full h-[100%] object-cover" />
      <div className="info flex items-center gap-5 p-[15px]">
        <img
          src={card.pp}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="texts">
          <h2 className="text-sm font-medium">{card.cat}</h2>
          <span className="text-sm font-light">{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
