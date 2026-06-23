import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError("");
      const data = await loginUser({ email, password });
      login(data.token, data.user);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string, demoPassword: string) => {
    if (loading) return;
    setEmail(demoEmail);
    setPassword(demoPassword);

    try {
      setLoading(true);
      setError("");
      const data = await loginUser({ email: demoEmail, password: demoPassword });
      login(data.token, data.user);
      toast.success(`Logged in as ${data.user.role === "admin" ? "Admin" : "Sales User"}`);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Demo login failed");
      toast.error(error.response?.data?.message || "Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Brand header */}
        <div className="bg-gray-900 px-8 py-6 text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">GigFlow</h1>
          <p className="text-gray-400 text-sm mt-1">Smart Leads Dashboard</p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {error && (
              <p className="text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400 font-semibold tracking-wider">
                Quick Demo Access
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin("admin@test.com", "password123")}
              className="group relative flex flex-col items-start p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:bg-gray-900/30 dark:hover:from-blue-950/20 dark:hover:to-indigo-950/20 text-left transition-all duration-300 hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Admin</span>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded">Full Access</span>
              </div>
              <span className="text-xs font-medium text-gray-800 dark:text-gray-250 mt-1 truncate w-full">admin@test.com</span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 font-mono">password123</span>
              
              <span className="absolute bottom-3 right-3 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-600 dark:text-blue-400 font-bold">
                →
              </span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin("naira@test.com", "password123")}
              className="group relative flex flex-col items-start p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:bg-gray-900/30 dark:hover:from-purple-950/20 dark:hover:to-pink-950/20 text-left transition-all duration-300 hover:shadow-md hover:border-purple-500/50 dark:hover:border-purple-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Sales User</span>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded">Limited</span>
              </div>
              <span className="text-xs font-medium text-gray-800 dark:text-gray-250 mt-1 truncate w-full">naira@test.com</span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 font-mono">password123</span>

              <span className="absolute bottom-3 right-3 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-purple-600 dark:text-purple-400 font-bold">
                →
              </span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;