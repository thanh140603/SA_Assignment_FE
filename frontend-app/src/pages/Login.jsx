import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Hardcoded: chỉ cho đăng nhập với admin/admin
    if (user.username === "admin" && user.password === "admin") {
      const loginUser = {
        username: "admin",
        role: "Admin"
      };
      localStorage.setItem("user", JSON.stringify(loginUser));
      navigate("/dashboard");
    } else {
      alert("❌ Invalid username or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-700">
      <div className="flex justify-center items-center w-full h-full">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">USER LOGIN</h2>

          <div className="mb-5 flex items-center border border-gray-300 rounded-lg shadow-sm transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-teal-500">
            <FaUser className="text-gray-500 ml-3" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-6 flex items-center border border-gray-300 rounded-lg shadow-sm transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-teal-500">
            <FaLock className="text-gray-500 ml-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 pl-10 border-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
