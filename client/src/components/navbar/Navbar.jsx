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
      className={`w-full flex flex-col items-center fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ease-in-out ${
        active || pathname !== "/"
          ? "bg-[#ffffff] text-[#000000] shadow-md"
          : "bg-[#013914] text-[#ffffff]"
      }`}
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1100px] flex items-center justify-between py-[20px] px-[20px]">
          <div className="text-[34px] font-bold">
            <Link className="no-underline" to="/">
              <span className="text-inherit">Lancr</span>
            </Link>
            <span className="text-[#1dbf73] font-bold">.</span>
          </div>
          <div className="flex items-center gap-[24px] font-[500] font-['Montserrat']">
            <span className="whitespace-nowrap">Lancr Business</span>
            <span className="whitespace-nowrap">Explore</span>
            <span className="whitespace-nowrap">English</span>
            {!currentUser?.isSeller && (
              <span className="whitespace-nowrap">Become a Seller</span>
            )}
            {currentUser ? (
              <div
                className="flex items-center gap-[10px] cursor-pointer relative"
                onClick={() => setOpen(!open)}
              >
                <img
                  src={currentUser.img || "/img/noavatar.jpg"}
                  alt=""
                  className="w-[32px] h-[32px] rounded-full object-cover"
                />
                <span>{currentUser?.username}</span>
                {open && (
                  <div className="absolute top-[50px] right-0 p-[20px] bg-[#ffffff] rounded-[10px] z-[9999] border border-[#e5e7eb] flex flex-col gap-[10px] w-[200px] font-[300] text-[#6b7280]">
                    {currentUser.isSeller && (
                      <>
                        <Link
                          className="no-underline text-inherit hover:text-[#1dbf73]"
                          to="/mygigs"
                        >
                          Gigs
                        </Link>
                        <Link
                          className="no-underline text-inherit hover:text-[#1dbf73]"
                          to="/add"
                        >
                          Add New Gig
                        </Link>
                      </>
                    )}
                    <Link
                      className="no-underline text-inherit hover:text-[#1dbf73]"
                      to="/orders"
                    >
                      Orders
                    </Link>
                    <Link
                      className="no-underline text-inherit hover:text-[#1dbf73]"
                      to="/messages"
                    >
                      Messages
                    </Link>
                    <Link
                      className="no-underline text-inherit hover:text-[#1dbf73] cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="no-underline text-inherit hover:text-[#1dbf73]"
                >
                  Sign in
                </Link>
                <Link className="no-underline text-inherit" to="/register">
                  <button
                    className={`px-[20px] py-[10px] rounded-[5px] border border-solid cursor-pointer ${
                      active || pathname !== "/"
                        ? "bg-[#ffffff] text-[#1dbf73] border-[#1dbf73] hover:bg-[#f0f0f0]"
                        : "bg-transparent text-[#ffffff] border-[#ffffff] hover:bg-[#1dbf73] hover:border-[#1dbf73]"
                    }`}
                  >
                    Join
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr className="w-full border-t border-b border-[#ebe9e9]" />
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[1100px] py-[10px] px-[20px] flex justify-between text-[#6b7280] font-[300] font-['Montserrat']">
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                Graphics & Design
              </Link>
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                Video & Animation
              </Link>
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                Writing & Translation
              </Link>
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                AI Services
              </Link>
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                Digital Marketing
              </Link>
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                Music & Audio
              </Link>
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                Programming & Tech
              </Link>
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                Business
              </Link>
              <Link
                className="no-underline text-inherit hover:text-[#1dbf73]"
                to="/"
              >
                Lifestyle
              </Link>
            </div>
          </div>
          <hr className="w-full border-t border-b border-[#ebe9e9]" />
        </>
      )}
    </div>
  );
}

export default Navbar;
