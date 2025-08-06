import { useState } from "react";
import upload from "../../utils/upload.js";
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

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = await upload(file);
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      const res = await newRequest.post("/auth/login", {
        username: user.username,
        password: user.password,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      console.log("Registration or login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl py-12 px-8 flex flex-col md:flex-row gap-12 bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
      >
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Create a new account
          </h1>

          <div className="space-y-4">
            <label className="block text-gray-300 text-sm font-medium">
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="johndoe"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-300 text-sm font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-300 text-sm font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-300 text-sm font-medium">
              Profile Picture
            </label>
            <div className="flex items-center gap-3">
              <label className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 cursor-pointer hover:bg-gray-600 transition">
                Choose File
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <span className="text-gray-400 text-sm">
                {file ? file.name : "No file chosen"}
              </span>
            </div>

            <label className="block text-gray-300 text-sm font-medium">
              Country
            </label>
            <input
              name="country"
              type="text"
              placeholder="USA"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Register
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            I want to become a seller
          </h1>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
              <label className="text-gray-300 text-sm font-medium">
                Activate seller account
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleSeller}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
              </label>
            </div>

            <label className="block text-gray-300 text-sm font-medium">
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              placeholder="+1 234 567 89"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <label className="block text-gray-300 text-sm font-medium">
              Description
            </label>
            <textarea
              placeholder="A short description of yourself"
              name="desc"
              cols="30"
              rows="8"
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
