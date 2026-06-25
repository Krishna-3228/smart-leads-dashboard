import { useState, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";
import { uploadProfileImage } from "../services/auth.service";

const DashboardLayout = () => {
    const { logout, user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const response = await uploadProfileImage(file);
            const updatedUser = { ...user!, imageUrl: response.imageUrl };
            updateUser(updatedUser);
            toast.success("Profile image updated successfully");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to upload image");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

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

                {user?.role === "admin" && (
                    <NavLink
                        to="/users"
                        className={navLinkClass}
                        onClick={() => setSidebarOpen(false)}
                    >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Users
                    </NavLink>
                )}
            </nav>

            {/* User info at bottom */}
            <div className="mt-auto pt-6 border-t border-gray-700/60">
                <div className="flex items-center gap-3 px-1 mb-3">
                    {/* Interactive Profile Avatar */}
                    <div 
                        className="relative group cursor-pointer flex-shrink-0" 
                        onClick={handleAvatarClick}
                        title="Click to update profile image"
                    >
                        {user?.imageUrl ? (
                            <img
                                src={user.imageUrl}
                                alt={user.name}
                                className="w-11 h-11 rounded-full object-cover border-2 border-blue-600/50 group-hover:border-blue-500 transition-all duration-200"
                            />
                        ) : (
                            <div className="w-11 h-11 rounded-full bg-blue-600/20 border-2 border-blue-600/30 group-hover:border-blue-600/50 flex items-center justify-center text-blue-400 font-semibold text-base transition-all duration-200">
                                {user?.name?.charAt(0).toUpperCase() || "?"}
                            </div>
                        )}
                        {/* Hover overlay with upload icon */}
                        <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                            {uploading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            disabled={uploading}
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate" title={user?.name}>{user?.name}</p>
                        <span className="inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 capitalize border border-blue-600/20">
                            {user?.role}
                        </span>
                    </div>
                </div>
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-150 mb-1"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>

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
        <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
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
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700/60 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                        {/* Hamburger – mobile only */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Open sidebar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
                                Smart Leads Dashboard
                            </h2>
                            <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">GigFlow – Lead Management</p>
                        </div>
                    </div>

                    {/* Desktop logout in header */}
                    <button
                        onClick={handleLogout}
                        className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </header>

                {/* Scrollable page content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;