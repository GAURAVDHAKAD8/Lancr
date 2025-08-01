import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <div key={card.id} className="px-[10px]">
            {" "}
            {/* Added padding between cards */}
            <CatCard card={card} />
          </div>
        ))}
      </Slide>
      <div className="bg-[#f1fdf7] flex justify-center py-[100px]">
        <div className="w-[1100px] flex items-center gap-[100px]">
          <div className="flex flex-col gap-[15px] flex-[2]">
            <h2 className="font-[500] mb-[10px] text-[25px]  ">
              A whole world of freelance talent at your fingertips
            </h2>
            <div className="flex items-center gap-[10px] font-[500] text-[15px] text-[#666]">
              <img src="./img/check.png" alt="" className="w-[20px] h-[20px]" />
              The best for every budget
            </div>
            <p className="text-[16px] font-[200] text-gray-500 leading-[28px] tracking-[1px]">
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="flex items-center gap-[10px] font-[500] text-[17px] text-[#666]">
              <img src="./img/check.png" alt="" className="w-[20px] h-[20px]" />
              Quality work done quickly
            </div>
            <p className="text-[16px] font-[200] text-gray-500 leading-[28px] tracking-[1px]">
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="flex items-center gap-[10px] font-[500] text-[17px] text-[#666]">
              <img src="./img/check.png" alt="" className="w-[20px] h-[20px]" />
              Protected payments, every time
            </div>
            <p className="text-[16px] font-[200] text-gray-500 leading-[28px] tracking-[1px]">
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="flex items-center gap-[10px] font-[500] text-[17px] text-[#666]">
              <img src="./img/check.png" alt="" className="w-[20px] h-[20px]" />
              24/7 support
            </div>
            <p className="text-[16px] font-[200] text-gray-500 leading-[28px] tracking-[1px]">
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="flex-[3]">
            <video src="./img/video.mp4" controls className="w-[520px]" />
          </div>
        </div>
      </div>
      <div className="flex justify-center py-[100px]">
        <div className="w-[1100px]">
          <h1 className="text-[#555]">Explore the marketplace</h1>
          <div className="w-full flex justify-between flex-wrap">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-[250px] h-[150px] flex flex-col gap-[8px] items-center justify-center text-center cursor-pointer"
              >
                <img
                  src={`https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/${
                    [
                      "graphics-design.d32a2f8",
                      "online-marketing.74e221b",
                      "writing-translation.32ebe2e",
                      "video-animation.f0d9d71",
                      "music-audio.320af20",
                      "programming.9362366",
                      "business.bbdf319",
                      "lifestyle.745b575",
                      "data.718910f",
                      "photography.01cf943",
                    ][i]
                  }.svg`}
                  alt=""
                  className="w-[50px] h-[50px]"
                />
                <div className="w-[50px] h-[2px] bg-[lightgray] transition-all duration-300 hover:w-[80px] hover:bg-[#1dbf73]"></div>
                <span className="font-[300]">
                  {
                    [
                      "Graphics & Design",
                      "Digital Marketing",
                      "Writing & Translation",
                      "Video & Animation",
                      "Music & Audio",
                      "Programming & Tech",
                      "Business",
                      "Lifestyle",
                      "Data",
                      "Photography",
                    ][i]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#CFD0CA] flex justify-center py-[100px]">
        <div className="w-[1100px] flex items-center gap-[200px]">
          <div className="flex flex-col gap-[15px] flex-[2]">
            <h1 className="text-white font-[500] mb-[10px]">
              Lancr <i className="font-[300]">business</i>
            </h1>
            <h1 className="text-white font-[500] mb-[10px]">
              A business solution designed for{" "}
              <i className="font-[300]">teams</i>
            </h1>
            <p className="text-white mb-[20px]">
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="text-white font-[300] text-[14px] flex items-center gap-[10px]">
              <img src="./img/check.png" alt="" className="w-[24px] h-[24px]" />
              Connect to freelancers with proven business experience
            </div>
            <div className="text-white font-[300] text-[14px] flex items-center gap-[10px]">
              <img src="./img/check.png" alt="" className="w-[24px] h-[24px]" />
              Get matched with the perfect talent by a customer success manager
            </div>
            <div className="text-white font-[300] text-[14px] flex items-center gap-[10px]">
              <img src="./img/check.png" alt="" className="w-[24px] h-[24px]" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button className="bg-[#1dbf73] border-none text-white py-[10px] px-[20px] rounded-[5px] w-max text-[16px] cursor-pointer mt-[20px]">
              Explore Lancr Business
            </button>
          </div>
          <div className="flex-[3]">
            <img
              src="./img/frelance.jpg"
              alt=""
              className="w-[600px] height:[200px]"
            />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
