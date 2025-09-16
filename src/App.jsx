import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Book from "./Pages/Book";
import Resources from "./Pages/Resources";
import PeerSupport from "./Pages/PeerSupport";
import Chatbot from "./Pages/Chatbot";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem("mindcare_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("mindcare_token");
    setIsAuthenticated(false);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      {/* Navigation - conditionally show links based on authentication */}
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/book">Book</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/peersupport">Peer Support</Link>
            <Link to="/Chatbot">Chat With Us</Link>
            <button onClick={handleLogout} className="ml-auto">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register onRegister={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/peersupport"
          element={
            <ProtectedRoute>
              <PeerSupport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
