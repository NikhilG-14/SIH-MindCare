import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function Home() {
  const featuresRef = useRef(null);
  
  // Smooth scroll function for "Learn More" button
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    // Observe all elements with the 'fade-in' class
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-indigo-900/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-70 animate-float"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-70 animate-float animation-delay-4000"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center z-10 px-4 md:px-0 fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6 transform transition-all duration-700 hover:scale-105">
              Welcome to MindCare <span className="inline-block animate-pulse">💙</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-700 mb-8 max-w-3xl mx-auto">
              Your digital sanctuary for mental wellness and psychological
              support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Get Started
              </Link>
              <Link
                to="/presession"
                className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md border border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Start Therapy Session
              </Link>
              <button
                onClick={scrollToFeatures}
                className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md border border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 fade-in">
            How MindCare Supports You
          </h2>

          {/* Quick Navigation */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center fade-in">
            {[
              { to: "/therapy", name: "Therapy", color: "from-blue-600 to-blue-700" },
              { to: "/analytics", name: "Analytics", color: "from-indigo-600 to-indigo-700" },
              { to: "/recommendations", name: "Recommendations", color: "from-green-600 to-green-700" },
              { to: "/settings", name: "Settings", color: "from-slate-700 to-slate-800" },
              { to: "/dashboard", name: "Dashboard", color: "from-purple-600 to-purple-700" },
              { to: "/book", name: "Book", color: "from-pink-600 to-pink-700" },
              { to: "/resources", name: "Resources", color: "from-amber-600 to-amber-700" },
              { to: "/peersupport", name: "Peer Support", color: "from-cyan-600 to-cyan-700" },
              { to: "/Chatbot", name: "Chat", color: "from-emerald-600 to-emerald-700" }
            ].map((item, index) => (
              <Link 
                key={index}
                to={item.to} 
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">
                Therapy Sessions
              </h3>
              <p className="text-blue-600 text-center">
                Book professional therapy sessions with licensed psychologists
                at your convenience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">
                Peer Support
              </h3>
              <p className="text-blue-600 text-center">
                Connect with others who understand your journey in a safe,
                moderated community.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2 text-center">
                Resources
              </h3>
              <p className="text-blue-600 text-center">
                Access curated mental health resources, articles, and self-help
                tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="fade-in">
              <p className="text-4xl md:text-5xl font-bold mb-2 animate-count">500+</p>
              <p className="text-blue-200">Users Helped</p>
            </div>
            <div className="fade-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-4xl md:text-5xl font-bold mb-2 animate-count">98%</p>
              <p className="text-blue-200">Satisfaction Rate</p>
            </div>
            <div className="fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-4xl md:text-5xl font-bold mb-2 animate-count">24/7</p>
              <p className="text-blue-200">Support Available</p>
            </div>
            <div className="fade-in" style={{ animationDelay: "0.6s" }}>
              <p className="text-4xl md:text-5xl font-bold mb-2 animate-count">50+</p>
              <p className="text-blue-200">Professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 fade-in">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 fade-in">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">Alex Johnson</h4>
                  <p className="text-blue-600 text-sm">
                    Using MindCare for 6 months
                  </p>
                </div>
              </div>
              <p className="text-blue-700 italic">
                "MindCare has transformed my mental health journey. The
                resources and community support have been invaluable."
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Sarah Williams
                  </h4>
                  <p className="text-blue-600 text-sm">
                    Using MindCare for 3 months
                  </p>
                </div>
              </div>
              <p className="text-blue-700 italic">
                "The booking system is so convenient, and my therapist is
                amazing. I'm finally making real progress."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Mental Wellness Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards better mental health with MindCare's
            comprehensive digital platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md border border-blue-700 hover:border-blue-800 transition-all duration-300 transform hover:-translate-y-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-blue-900 to-indigo-900 text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="fade-in">
            <h3 className="text-xl font-semibold mb-4">MindCare</h3>
            <p className="text-blue-200">
              Digital Psychological Intervention System - SIH 2025 Project
            </p>
          </div>
          <div className="fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-blue-200 hover:text-white transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-blue-200 hover:text-white transition-all duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-blue-200 hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-blue-200 hover:text-white transition-all duration-300"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div className="fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-all duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-all duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-all duration-300"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="fade-in" style={{ animationDelay: "0.6s" }}>
            <h3 className="text-xl font-semibold mb-4">Get Help Now</h3>
            <p className="text-blue-200">
              If you're in crisis, please call the National Mental Health
              Helpline:
              <span className="block font-semibold mt-1">1-800-123-HELP</span>
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-blue-700 text-center text-blue-300">
          <p>© 2025 MindCare. All rights reserved.</p>
        </div>
      </footer>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes count {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 7s infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-count {
          animation: count 1s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .fade-in {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Home;