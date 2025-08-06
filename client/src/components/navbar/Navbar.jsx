import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        active ? "shadow-lg" : ""
      } bg-gray-900 text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-[15px] lg:px-8">
        <div className="flex justify-between items-center h-[80px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Lancr
              </span>
              <span className="text-purple-400 font-bold">.</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium hover:text-purple-400 transition-colors duration-200"
            >
              Lancr Business
            </Link>
            <Link
              to="/"
              className="text-sm font-medium hover:text-purple-400 transition-colors duration-200"
            >
              Explore
            </Link>
            <Link
              to="/"
              className="text-sm font-medium hover:text-purple-400 transition-colors duration-200"
            >
              English
            </Link>
            {!currentUser?.isSeller && (
              <Link
                to="/"
                className="text-sm font-medium hover:text-purple-400 transition-colors duration-200"
              >
                Become a Seller
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={currentUser.img || "/img/noavatar.jpg"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border border-gray-700"
                  />
                  <span className="text-xl font-medium">
                    {currentUser?.username}
                  </span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                    {currentUser.isSeller && (
                      <>
                        <Link
                          to="/mygigs"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                        >
                          Gigs
                        </Link>
                        <Link
                          to="/add"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                        >
                          Add New Gig
                        </Link>
                      </>
                    )}
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/messages"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                    >
                      Messages
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium hover:text-purple-400 transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 rounded-md text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200">
                    Join
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"} bg-gray-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {currentUser ? (
            <>
              <div className="flex items-center px-3 py-2">
                <img
                  src={currentUser.img || "/img/noavatar.jpg"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <span className="text-sm font-medium">
                  {currentUser?.username}
                </span>
              </div>
              {currentUser.isSeller && (
                <>
                  <Link
                    to="/mygigs"
                    className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                  >
                    Gigs
                  </Link>
                  <Link
                    to="/add"
                    className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                  >
                    Add New Gig
                  </Link>
                </>
              )}
              <Link
                to="/orders"
                className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-purple-400"
              >
                Orders
              </Link>
              <Link
                to="/messages"
                className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-purple-400"
              >
                Messages
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-purple-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-purple-400"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-purple-400"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Links */}
      {(active || pathname !== "/") && (
        <div className="bg-gray-800 border-t border-gray-700">
          <div className="max-w-[12000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-3 space-x-6 hide-scrollbar">
              {[
                "Graphics & Design",
                "Video & Animation",
                "Writing & Translation",
                "AI Services",
                "Digital Marketing",
                "Music & Audio",
                "Programming & Tech",
                "Business",
                "Lifestyle",
              ].map((category) => (
                <Link
                  key={category}
                  to="/"
                  className="flex-shrink-0 text-[12px] font-medium text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
