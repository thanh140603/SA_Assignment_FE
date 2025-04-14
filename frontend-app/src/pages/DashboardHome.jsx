// src/pages/DashboardHome.jsx
export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600">You are logged in as: <strong>{user?.role}</strong></p>
    </div>
  );
}
