import React from "react";

const TrustedBy = () => {
  return (
    <div className="bg-gray-800 py-8 border-y border-gray-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
          <span className="font-medium">Trusted by:</span>
          {[
            "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png",
            "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png",
            "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png",
            "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png",
            "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png",
          ].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Trusted company"
              className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
