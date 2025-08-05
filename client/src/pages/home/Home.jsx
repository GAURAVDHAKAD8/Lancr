import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="bg-gray-900 text-gray-200">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <div key={card.id} className="px-2">
            <CatCard card={card} />
          </div>
        ))}
      </Slide>

      {/* Features Section */}
      <div className="bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              A whole world of freelance talent at your fingertips
            </h2>

            {[
              "The best for every budget",
              "Quality work done quickly",
              "Protected payments, every time",
              "24/7 support",
            ].map((feature, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="font-medium text-gray-300">{feature}</span>
                </div>
                <p className="text-gray-400 ml-8">
                  {index === 0 &&
                    "Find high-quality services at every price point. No hourly rates, just project-based pricing."}
                  {index === 1 &&
                    "Find the right freelancer to begin working on your project within minutes."}
                  {index === 2 &&
                    "Always know what you'll pay upfront. Your payment isn't released until you approve the work."}
                  {index === 3 &&
                    "Find high-quality services at every price point. No hourly rates, just project-based pricing."}
                </p>
              </div>
            ))}
          </div>
          <div className="flex-1">
            <img
              src="./img/freelancer.gif"
              alt="Freelancer working"
              className="w-full rounded-xl border border-gray-700 transition-all duration-500 ease-in-out
           shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-1 hover:-translate-x-2"
            />
          </div>
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-300 mb-8">
            Explore the marketplace
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
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
            ].map((category, i) => (
              <div
                key={i}
                className="group p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 cursor-pointer text-center"
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
                  className="w-12 h-12 mx-auto mb-4"
                />
                <div className="w-12 h-0.5 bg-gray-600 mx-auto group-hover:w-16 group-hover:bg-purple-500 transition-all duration-300 mb-3"></div>
                <span className="text-gray-300 group-hover:text-white">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 border-t border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Lancr <span className="font-light">business</span>
            </h1>
            <h2 className="text-2xl text-gray-300">
              A business solution designed for{" "}
              <span className="font-light">teams</span>
            </h2>
            <p className="text-gray-400">
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>

            {[
              "Connect to freelancers with proven business experience",
              "Get matched with the perfect talent by a customer success manager",
              "Manage teamwork and boost productivity with one powerful workspace",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}

            <button className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
              Explore Lancr Business
            </button>
          </div>
          <div className="flex-1">
            <img
              src="./img/frelance.jpg"
              alt="Freelancer working"
              className="w-full rounded-xl border border-gray-700 transition-all duration-500 ease-in-out
           shadow-lg hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-2 hover:-translate-x-2"
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
