import { Routes, Route, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Book from "./Pages/Book";
import Resources from "./Pages/Resources";
import PeerSupport from "./Pages/PeerSupport";
import Chatbot from "./Pages/Chatbot";
import Therapy from "./Pages/Therapy";
import Analytics from "./Pages/Analytics";
import Recommendations from "./Pages/Recommendations";
import Settings from "./Pages/Settings";
import PreSession from "./Pages/PreSession";

function App() {
  const [_unused, _setUnused] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-2xl border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-18 flex items-center justify-between relative">
            {/* Luxury background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50"></div>
            
            {/* Left: Logo with luxury styling */}
            <div className="flex-1">
              <Link
                to="/"
                className="relative z-10 flex items-center gap-3 group w-fit"
              >
                {/* UDAAN Logo SVG - Flying/Soaring bird representing flight */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg 
                    className="w-7 h-7 text-white drop-shadow-sm" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {/* Stylized bird/wings representing flight and soaring */}
                    <path d="M12 2C12 2 8 4 8 8C8 10 9 11 10 11.5C8 12 6 13 4 15C4 15 6 14 8 14C8 16 10 18 12 18C14 18 16 16 16 14C18 14 20 15 20 15C18 13 16 12 14 11.5C15 11 16 10 16 8C16 4 12 2 12 2Z"/>
                    <path d="M12 4C12 4 10 5.5 10 8C10 9 10.5 9.5 11 10C10 10.2 9 10.8 8 12C9 11.8 10 12 10 12C10 13.5 11 15 12 15C13 15 14 13.5 14 12C14 12 15 11.8 16 12C15 10.8 14 10.2 13 10C13.5 9.5 14 9 14 8C14 5.5 12 4 12 4Z" fill="rgba(255,255,255,0.4)"/>
                  </svg>
                </div>
                <span className="text-3xl font-black tracking-wide bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-sm group-hover:from-yellow-200 group-hover:to-white transition-all duration-300">
                  UDAAN
                </span>
              </Link>
            </div>

            {/* Center: Navigation Links with luxury styling */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-1 text-sm font-medium relative z-10">
                {[
                  { to: "/dashboard", label: "Dashboard", icon: "📊" },
                  { to: "/book", label: "Book", icon: "📚" },
                  { to: "/resources", label: "Resources", icon: "🎯" },
                  { to: "/peersupport", label: "Peer Support", icon: "🤝" },
                  { to: "/Chatbot", label: "Chat", icon: "💬" },
                  { to: "/therapy", label: "Therapy", icon: "🧠" },
                  { to: "/analytics", label: "Analytics", icon: "📈" },
                  { to: "/recommendations", label: "Recommendations", icon: "⭐" },
                  { to: "/settings", label: "Settings", icon: "⚙️" },
                ].map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `relative px-4 py-2.5 rounded-xl transition-all duration-300 group hover:bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/20 ${
                        isActive
                          ? "bg-white/25 border-white/30 shadow-lg backdrop-blur-md font-semibold"
                          : "opacity-90 hover:opacity-100 hover:shadow-md"
                      }`
                    }
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm group-hover:scale-110 transition-transform duration-300">
                        {icon}
                      </span>
                      <span className="relative">
                        {label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 group-hover:w-full transition-all duration-500"></span>
                      </span>
                    </span>
                    
                    {/* Luxury glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-500"></div>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right: Login/Register with luxury styling */}
            <div className="flex-1 flex items-center justify-end">
              <div className="flex items-center gap-3 text-sm font-medium relative z-10">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden group border-2 ${
                      isActive
                        ? "bg-white text-blue-700 font-bold shadow-lg border-white"
                        : "border-white/40 hover:border-white hover:bg-white/10 backdrop-blur-sm"
                    }`
                  }
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-sm">🔐</span>
                    Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </NavLink>
                
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-xl transition-all duration-300 relative overflow-hidden group border-2 ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold shadow-xl border-transparent"
                        : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 border-transparent shadow-lg hover:shadow-xl"
                    }`
                  }
                >
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    <span className="text-sm">✨</span>
                    Register
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </NavLink>
              </div>
            </div>

            {/* Luxury decorative elements */}
            <div className="absolute top-0 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
        </div>

        {/* Bottom luxury border */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/therapy" element={<Therapy />} />
        <Route path="/presession" element={<PreSession />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<Book />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/peersupport" element={<PeerSupport />} />
        <Route path="/Chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;