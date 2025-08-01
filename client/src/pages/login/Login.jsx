import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[360px] py-[100px] flex flex-col gap-[20px]"
      >
        <h1 className="text-gray-500 mb-[20px]">Sign in</h1>
        <label className="text-gray-500 text-[18px]">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
          className="p-[20px] border border-[rgb(216,214,214)]"
        />

        <label className="text-gray-500 text-[18px]">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-[20px] border border-[rgb(216,214,214)]"
        />
        <button
          type="submit"
          className="border-none p-[20px] text-white font-[500] text-[18px] bg-[#1dbf73] cursor-pointer"
        >
          Login
        </button>
        {error && <span className="text-red-500 text-[12px]">{error}</span>}
      </form>
    </div>
  );
}

export default Login;
