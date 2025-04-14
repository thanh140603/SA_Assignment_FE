// src/components/AddUser.jsx
import { useState } from "react";

export default function AddUser() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "Staff"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("❌ Mật khẩu không khớp!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username === form.username)) {
      alert("⚠️ Username đã tồn tại!");
      return;
    }

    const newUser = {
      username: form.username,
      password: form.password,
      role: form.role
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Tạo tài khoản thành công!");
    setForm({ username: "", password: "", confirmPassword: "", role: "Staff" });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add New Account</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Admin">Admin</option>
          <option value="Doctor">Doctor</option>
          <option value="Staff">Staff</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Account
        </button>
      </form>
    </div>
  );
}
