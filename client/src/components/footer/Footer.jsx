import React from "react";

function Footer() {
  return (
    <div className="flex justify-center bg-gray-900 text-gray-300 py-16">
      <div className="w-[1100px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium text-white mb-2">Categories</h2>
            {[
              "Graphics & Design",
              "Digital Marketing",
              "Writing & Translation",
              "Video & Animation",
              "Music & Audio",
              "Programming & Tech",
              "Data",
              "Business",
              "Lifestyle",
              "Photography",
              "Sitemap",
            ].map((item) => (
              <span
                key={item}
                className="text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium text-white mb-2">About</h2>
            {[
              "Press & News",
              "Partnerships",
              "Privacy Policy",
              "Terms of Service",
              "Intellectual Property Claims",
              "Investor Relations",
              "Contact Sales",
            ].map((item) => (
              <span
                key={item}
                className="text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium text-white mb-2">Support</h2>
            {[
              "Help & Support",
              "Trust & Safety",
              "Selling on Lancr",
              "Buying on Lancr",
            ].map((item) => (
              <span
                key={item}
                className="text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Community */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium text-white mb-2">Community</h2>
            {[
              "Customer Success Stories",
              "Community hub",
              "Forum",
              "Events",
              "Blog",
              "Influencers",
              "Affiliates",
              "Podcast",
              "Invite a Friend",
              "Become a Seller",
              "Community Standards",
            ].map((item) => (
              <span
                key={item}
                className="text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>

          {/* More From Lancr */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium text-white mb-2">
              More From Lancr
            </h2>
            {[
              "Lancr Business",
              "Lancr Pro",
              "Lancr Logo Maker",
              "Lancr Guides",
              "Get Inspired",
              "Lancr Select",
              "ClearVoice",
              "Lancr Workspace",
              "Learn",
              "Working Not Working",
            ].map((item) => (
              <span
                key={item}
                className="text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer">
              Lancr
            </h2>
            <span className="text-xs text-gray-500">
              © Lancr International Ltd. 2025
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {[
                "twitter",
                "facebook",
                "linkedin",
                "pinterest",
                "instagram",
              ].map((social) => (
                <div
                  key={social}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                >
                  <img
                    src={`/img/${social}.png`}
                    alt={social}
                    className="w-4 h-4 filter brightness-0 invert opacity-80 hover:opacity-100"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-200">
                  <img
                    src="/img/language.png"
                    alt="Language"
                    className="w-4 h-4 filter brightness-0 invert opacity-80 group-hover:opacity-100"
                  />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors duration-200">
                  English
                </span>
              </div>

              <div className="flex items-center gap-1 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-200">
                  <img
                    src="/img/coin.png"
                    alt="Currency"
                    className="w-4 h-4 filter brightness-0 invert opacity-80 group-hover:opacity-100"
                  />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors duration-200">
                  USD
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <img
                  src="/img/accessibility.png"
                  alt="Accessibility"
                  className="w-4 h-4 filter brightness-0 invert opacity-80 hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
