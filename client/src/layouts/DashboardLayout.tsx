import {
    NavLink,
    Outlet,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
    const { logout } = useAuth();

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-900 text-white p-4">
                <h1 className="text-2xl font-bold mb-8">
                    Smart Leads
                </h1>

                <nav className="flex flex-col gap-4">
                    <NavLink to="/dashboard" className={({ isActive }) =>
                        isActive
                            ? "text-blue-400 font-semibold"
                            : "text-white"
                    }>
                        Dashboard
                    </NavLink>

                    <NavLink to="/leads" className={({ isActive }) =>
                        isActive
                            ? "text-blue-400 font-semibold"
                            : "text-white"
                    }>
                        Leads
                    </NavLink>
                </nav>
            </aside>

            <main className="flex-1 p-6 bg-gray-100">
                <header className="bg-white shadow p-4 rounded-lg mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        GigFlow – Smart Leads Dashboard
                    </h2>

                    <button
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                        className="text-sm text-red-500 font-medium"
                    >
                        Logout
                    </button>
                </header>

                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;