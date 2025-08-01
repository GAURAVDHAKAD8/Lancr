import { useState } from "react";
import upload from "../../utils/upload.js";
import "./Register.scss";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(user);

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = await upload(file);

      // Register the user
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });

      // Then log the user in
      const res = await newRequest.post("/auth/login", {
        username: user.username,
        password: user.password,
      });

      // Save to localStorage
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      // Navigate to homepage
      navigate("/");
    } catch (err) {
      console.log("Registration or login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[960px] py-[100px] flex gap-[120px]"
      >
        <div className="flex-1 flex flex-col gap-[10px] justify-between">
          <h1 className="text-gray-500 mb-[20px]">Create a new account</h1>
          <label className="text-gray-500 text-[18px]">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            className="p-[20px] border border-[rgb(216,214,214)]"
          />
          {/* Email Input */}
          <label className="text-gray-500 text-[18px]">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            className="p-[20px] border border-[rgb(216,214,214)]"
          />
          {/* Password Input */}
          <label className="text-gray-500 text-[18px]">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="p-[20px] border border-[rgb(216,214,214)]"
          />
          {/* Profile Picture */}
          <label className="text-gray-500 text-[18px]">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-[20px] border border-[rgb(216,214,214)]"
          />
          {/* Country */}
          <label className="text-gray-500 text-[18px]">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
            className="p-[20px] border border-[rgb(216,214,214)]"
          />
          {/* Register Button */}
          <button
            type="submit"
            className="border-none p-[20px] text-white font-[500] text-[18px] bg-[#1dbf73] cursor-pointer"
          >
            Register
          </button>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-[10px] justify-between">
          <h1 className="text-gray-500 mb-[20px]">I want to become a seller</h1>

          {/* Toggle Switch - kept exactly as in original */}
          <div className="flex items-center gap-[10px]">
            <label className="text-gray-500 text-[18px]">
              Activate the seller account
            </label>
            <label className="switch relative inline-block w-[50px] h-[24px]">
              <input
                type="checkbox"
                onChange={handleSeller}
                className="opacity-0 w-0 h-0"
              />
              <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc] transition-[0.4s] rounded-[24px] before:absolute before:content-[''] before:h-[16px] before:w-[16px] before:left-[4px] before:bottom-[4px] before:bg-white before:transition-[0.4s] before:rounded-[50%]"></span>
            </label>
          </div>

          {/* Phone Number */}
          <label className="text-gray-500 text-[18px]">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
            className="p-[20px] border border-[rgb(216,214,214)]"
          />

          {/* Description */}
          <label className="text-gray-500 text-[18px]">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            cols="30"
            rows="10"
            onChange={handleChange}
            className="p-[20px] border border-[rgb(216,214,214)]"
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
