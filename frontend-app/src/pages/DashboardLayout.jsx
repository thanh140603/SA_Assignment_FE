// src/pages/DashboardLayout.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.username}</h2>
        <p className="italic text-sm mb-4">Role: {user?.role}</p>
        <nav className="space-y-2">
            <NavLink to="/dashboard" className="block hover:text-yellow-300">Dashboard</NavLink>
            <NavLink to="/dashboard/users" className="block hover:text-yellow-300">Manage Users</NavLink>
            <NavLink to="/dashboard/patients" className="block hover:text-yellow-300">Manage Patients</NavLink>
            <NavLink to="/dashboard/prescriptions" className="block hover:text-yellow-300">Prescriptions</NavLink>
            <NavLink to="/dashboard/appointments" className="block hover:text-yellow-300">Appointments</NavLink>
            <NavLink to="/dashboard/medicines" className="block hover:text-yellow-300">Manage Medicines</NavLink>
            <NavLink to="/dashboard/faculties" className="block hover:text-yellow-300">Manage Faculties</NavLink>
        </nav>
        <button onClick={handleLogout} className="mt-10 bg-red-500 py-2 px-4 rounded hover:bg-red-600 w-full">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
