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
    <div>
      {/* Navigation - conditionally show links based on authentication */}
      <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-14 flex items-center gap-4">
            <Link to="/" className="font-bold tracking-wide">MindCare</Link>
            <div className="flex items-center gap-3 text-sm">
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/dashboard">Dashboard</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/book">Book</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/resources">Resources</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/peersupport">Peer Support</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/Chatbot">Chat</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/therapy">Therapy</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/analytics">Analytics</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/recommendations">Recommendations</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/settings">Settings</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/login">Login</NavLink>
              <NavLink className={({isActive}) => isActive ? "underline" : "opacity-90 hover:opacity-100"} to="/register">Register</NavLink>
            </div>
            <div className="ml-auto" />
          </div>
        </div>
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
