import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`;

    const handleLogout = () => {
        try {
            logout();
            navigate("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");
            console.log(error);
        }
    };

    const SidebarContent = () => (
        <>
            {/* Brand */}
            <div className="flex items-center justify-between mb-8 px-1">
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">GigFlow</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Smart Leads</p>
                </div>
                {/* Close button – mobile only */}
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    aria-label="Close sidebar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-1 mb-2">Navigation</p>

            <nav className="flex flex-col gap-1">
                <NavLink
                    to="/dashboard"
                    end
                    className={navLinkClass}
                    onClick={() => setSidebarOpen(false)}
                >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/leads"
                    className={navLinkClass}
                    onClick={() => setSidebarOpen(false)}
                >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Leads
                </NavLink>
            </nav>

            {/* User info at bottom */}
            <div className="mt-auto pt-6 border-t border-gray-700/60">
                <div className="px-1 mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                    <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 capitalize border border-blue-600/20">
                        {user?.role}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-150"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* ── Mobile overlay backdrop ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* ── Desktop sidebar ── */}
            <aside className="hidden md:flex w-64 bg-gray-900 flex-col p-4 flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* ── Mobile sidebar (slide-in) ── */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 flex flex-col p-4 transform transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <SidebarContent />
            </aside>

            {/* ── Main content ── */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Hamburger – mobile only */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                            aria-label="Open sidebar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                                Smart Leads Dashboard
                            </h2>
                            <p className="text-xs text-gray-400 hidden sm:block">GigFlow – Lead Management</p>
                        </div>
                    </div>

                    {/* Desktop logout in header */}
                    <button
                        onClick={handleLogout}
                        className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </header>

                {/* Scrollable page content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;