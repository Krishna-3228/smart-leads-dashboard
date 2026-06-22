import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | GigFlow";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-12 transition-colors duration-200 relative overflow-hidden">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md w-full max-w-xl rounded-3xl shadow-2xl border border-gray-100/50 dark:border-gray-700/50 p-8 sm:p-12 text-center relative z-10 overflow-hidden transition-all duration-300">
        
        {/* Glow element behind illustration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Animated 404 Illustration */}
        <div className="relative mb-8 flex justify-center">
          <svg
            className="w-64 h-64 sm:w-72 sm:h-72 select-none"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(2deg); }
              }
              @keyframes orbit {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0%, 100% { opacity: 0.3; transform: scale(0.98); }
                50% { opacity: 0.7; transform: scale(1.02); }
              }
              .float-group {
                animation: float 6s ease-in-out infinite;
                transform-origin: center;
              }
              .orbit-line {
                animation: orbit 20s linear infinite;
                transform-origin: 150px 150px;
              }
              .pulse-ring {
                animation: pulse 4s ease-in-out infinite;
                transform-origin: center;
              }
            `}</style>

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="textGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="planetGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.8)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>

            {/* Pulsing Background Radar Ring */}
            <circle cx="150" cy="150" r="110" className="pulse-ring" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.2" className="text-indigo-400 dark:text-indigo-600" />
            <circle cx="150" cy="150" r="85" className="pulse-ring" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" className="text-indigo-400 dark:text-indigo-600" style={{ animationDelay: "1s" }} />

            {/* Orbiting Tiny Satellites */}
            <g className="orbit-line">
              <circle cx="150" cy="40" r="4" className="fill-indigo-500" />
              <circle cx="260" cy="150" r="2.5" className="fill-blue-400" />
            </g>

            {/* Main Floating Group (The 404 text and main elements) */}
            <g className="float-group">
              {/* Left Number "4" */}
              <text
                x="35"
                y="170"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="110"
                fill="url(#textGrad)"
                className="select-none tracking-tighter opacity-90"
              >
                4
              </text>

              {/* Central Planet (The "0") */}
              <g>
                {/* Planet Sphere shadow */}
                <circle cx="150" cy="130" r="42" fill="rgba(0,0,0,0.15)" />
                {/* Planet Sphere */}
                <circle cx="150" cy="130" r="40" fill="url(#planetGrad)" />
                
                {/* Planet Ring */}
                <ellipse
                  cx="150"
                  cy="130"
                  rx="65"
                  ry="16"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="6"
                  transform="rotate(-15, 150, 130)"
                />
                
                {/* Overlay half sphere to put front ring behind planet, back in front */}
                <path
                  d="M 111.3 119.7 A 40 40 0 0 0 188.7 140.3 Z"
                  fill="url(#planetGrad)"
                  transform="rotate(-15, 150, 130)"
                />
                
                {/* Planet Texture details */}
                <path
                  d="M 120 120 Q 140 130 180 120"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 115 132 Q 150 145 178 135"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>

              {/* Right Number "4" */}
              <text
                x="205"
                y="170"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="110"
                fill="url(#textGrad)"
                className="select-none tracking-tighter opacity-90"
              >
                4
              </text>
            </g>

            {/* Sparkles / Stars */}
            <path d="M 60 70 L 63 73 L 60 76 L 57 73 Z" className="fill-indigo-300 dark:fill-indigo-500 animate-pulse" />
            <path d="M 230 65 L 232 67 L 230 69 L 228 67 Z" className="fill-blue-300 dark:fill-blue-500 animate-pulse" style={{ animationDelay: "1.5s" }} />
            <path d="M 90 220 L 91.5 221.5 L 90 223 L 88.5 221.5 Z" className="fill-indigo-300 dark:fill-indigo-500 animate-pulse" style={{ animationDelay: "0.8s" }} />
          </svg>
        </div>

        {/* Text Details */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
          Page Not Found
        </h1>
        
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 dark:shadow-indigo-500/20 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500"
          >
            Go Back Home
          </Link>
          
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
          >
            Sign In to Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
